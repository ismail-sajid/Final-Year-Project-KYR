import { useState } from "react";
import "./styles/CasePost.css";

type Post = {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  comments: string[];
};

type CasePostProps = {
  initialPosts?: Post[];
};

const CasePost = ({ initialPosts = [] }: CasePostProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "Sexual Abuse",
    content: "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost((prevState) => ({ ...prevState, content: e.target.value }));
  };

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newPostWithId: Post = {
      ...newPost,
      id: nextId,
      upvotes: 0,
      comments: [],
    };
    setPosts((prevState) => [...prevState, newPostWithId]);
    setNewPost({ title: "", content: "" });
    setShowForm(false);
  };

  const handleUpvote = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (id: number, comment: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    );
    setPosts(updatedPosts);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="case-post-container">
      <h2 className="main-heading">Cases:</h2>
      <button className="create-post-btn" onClick={handleFormToggle}>
        Create Post
      </button>
      {showForm && (
        <form className="post-form" onSubmit={handlePostSubmit}>
          <input
            type="text"
            value={newPost.title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="What happened?"
            value={newPost.content}
            onChange={handleContentChange}
          />
          <button type="submit">Submit Post</button>
        </form>
      )}
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-buttons">
              <button
                className="upvote-btn"
                onClick={() => handleUpvote(post.id)}
              >
                Upvote {post.upvotes}
              </button>
              <button
                className="comment-btn"
                onClick={() => console.log("Comment clicked")}
              >
                Help {post.comments.length}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CasePost;
