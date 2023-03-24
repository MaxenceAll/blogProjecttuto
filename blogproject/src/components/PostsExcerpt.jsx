import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

function PostsExcerpt({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <p>
        <TimeAgo timestamp={post.date} />
      </p>
      <p>
        <ReactionsButtons post={post} />
      </p>
    </article>
  );
}

export default PostsExcerpt;
