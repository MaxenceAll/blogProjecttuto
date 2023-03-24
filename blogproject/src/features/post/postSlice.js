import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

import axios from 'axios'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

// const initialState = [
//   {
//     id: 1,
//     title: "Learning Redeux",
//     content: "blablablabla",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: 2,
//     title: "Slice",
//     content: "totototototot",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),

//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {

    try {
        const resp = await axios.get(POST_URL);
        return [...resp.data]
    } catch (error) {
        return error.message
    }
})

const initialState= {
    posts:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded'| 'failed'
    error: null
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };

      },
    },
    addReaction: (state, action) => {
        const existingPost = state.posts.find( post => post.id === action.payload.postId);
        if (existingPost){
            existingPost.reactions[action.payload.reaction]++;
        }
    }
  },
  extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state,action) =>{
                state.status= 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) =>{
                state.status = 'succeeded'
                //adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post=> {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        hearth: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                //add any fetched post to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) =>{
                state.status = 'failed';
            })
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
