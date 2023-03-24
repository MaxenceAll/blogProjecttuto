import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../features/post/postSlice";
import { selectAllUsers } from "../features/users/usersSlice";

function AddPostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);

  function onTitleChanged(e) {
    setTitle(e.target.value);
  }

  function onContentChanged(e) {
    setContent(e.target.value);
  }

  function onUserChanged(e) {
    setUserId(e.target.value);
  }

  function onSubmit() {
    if (title && content) {
      dispatch(addPost(title, content, userId));
      setTitle("");
      setContent("");
    }
  }


  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add new post : </h2>

      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postUser">Author :</label>
        <select id="postUser" value={userId} onChange={onUserChanged}>
          <option value="">Select One</option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Post content:</label>
        <input
          type="text"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSubmit} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
