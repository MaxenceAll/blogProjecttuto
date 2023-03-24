import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// const initialState =[
//     {id: '0', name:"Dude Lebowski"},
//     {id: '1', name:"Neil Young"},
//     {id: '2', name:"Dave Gray"}
// ]


const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=> {

    try {
        const resp = await axios.get(USERS_URL);
        return [...resp.data]
    } catch (error) {
        return error.message
    }
})

const usersSlice= createSlice({
    name: "users",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            return action.payload
        })

    }
})

export const selectAllUsers = (state) => state.users;


export default usersSlice.reducer;