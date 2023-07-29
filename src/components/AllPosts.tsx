/*import React, { useEffect, useState } from "react";
import "./styles/AllPosts.css";

function AllPosts() {
  const [Posts, setPosts] = useState([]);
  const [NoOfLikes, setNoOfLikes] = useState({});//hihk
  const email = localStorage.getItem("token");
  const [CheckBool,setCheckBool] = useState(false)

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/all-posts");
        const data = await response.json();
        setPosts(data.All_Posts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  
 

  const renderedPosts = Posts.map((post) => {
    const postId = post[0];
    const username = post[2];
    const content = post[4];
    const likes=post[5];
    const alllikes=post[8];


    
    const handlePostLikes = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          likes:likes,
          email: email,
        }),
      };
  
      try {
        const response = await fetch("http://127.0.0.1:5000/post-liked", requestOptions);
        const data = await response.json();
        setNoOfLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: data.likes,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
      setCheckBool(true)
    };

    const handleDislikes = async () => {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          likes:likes,
          email: email,
        }),
      
      };
  
      try {
      const response = await fetch("http://127.0.0.1:5000/post-disliked", requestOptions);
      const data = await response.json();
      setNoOfLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: data.likes,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
    setCheckBool(false)
    };


    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          email: email,
        }),
      };
      fetch("http://127.0.0.1:5000/check-likes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.value === "true"){
          setCheckBool(false)
          
        }
        else if (data.value === "false"){
          setCheckBool(true)
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      return (
        <>
          {!CheckBool && (
            <li key={postId} className="case-card-posts">
              <h3>{username}</h3>
              <p>{content}</p>
              <p>Likes: {likes}</p>
              <div className="post-buttons">
                <button className="allpost-button" onClick={() => handlePostLikes()}>
                  Like
                </button>
                <button className="allpost-button">Applicable Laws</button>
                <button className="allpost-button">comment</button>
              </div>
            </li>
          )}
          {CheckBool && (
            <li key={postId} className="case-card-posts">
              <h3>{username}</h3>
              <p>{content}</p>
              <p>Likes: {likes}</p>
              <div className="post-buttons">
                <button className="allpost-button" onClick={() => handleDislikes()}>
                  Liked
                </button>
                <button className="allpost-button">Applicable Laws</button>
                <button className="allpost-button">comment</button>
              </div>
            </li>
        )}
        </>
      );
      
  });

  return (
    <div className="all-posts-container">
      <div className="all-posts">
        <h2 className="all-posts-heading">All Posts:</h2>
        <ul className="post-list">{renderedPosts}</ul>
      </div>
    </div>
  );
}

export default AllPosts;*/