import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostError,
  getPostStatus,
  fetchPosts,
} from "../features/post/postSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postErrors = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  switch (postStatus) {
    case "loading":
      content = <p>Loading ...</p>;
      break;

    case "failed":
      content = <p>{postErrors}</p>;
      break;

    case "succeeded":
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));
      content = orderedPosts.map((post) => (
        <PostsExcerpt key={post.id} post={post} />
      ));
      break;

    default:
      break;
  }

  return (
    <section>
      <h2>Posts :</h2>
      {content}
    </section>
  );
}

export default PostList;
