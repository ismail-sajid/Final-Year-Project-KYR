import React, { useEffect, useState } from "react";
import "./styles/AllPosts.css";
import "./styles/comments.css";
import "./styles/Posts.css";

import { formatDistance, subDays } from "date-fns";

type Post = [number, number, string, string, string, number, any,string, string,number];
type Comment = [number, number, number, string, string]
function AllPosts() {
  const [Posts, setPosts] = useState<Post[]>([]);
  const [LikedPosts, setLikedPosts] = useState<number[]>([]);
  const [CanDeletePosts, setCanDeletePosts] = useState<number[]>([]);
  
  const [PastLikedPosts, setPastLikedPosts] = useState<number[]>([]);
  const [commentBoxId, setCommentBoxId] = useState<number | null>(null); // Track the opened comment box by ID
  const [Comments, setComments] = useState<Comment[]>([]);
  const [applicablelawsId, setapplicablelawsId] = useState<number | null>(null); 
  const [CommentBox, setCommentBox] = useState<string>(""); // Track the comment text
  const [CanDelete,setCanDelete]= useState(false)
  const [applicableLawsBox, setApplicableLawsBox] = useState<string>(""); 
  const email = localStorage.getItem("token");
  const [ShowCommentBox,setShowCommentBox] = useState(false)
  const [ShowLaws, setShowLaws] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [LawList,setLawList] = useState<string[]>([]);

  const toggleExpansion = (postId: number) => {
    setExpandedPosts((prevExpandedPosts) =>
      prevExpandedPosts.includes(postId)
        ? prevExpandedPosts.filter((id) => id !== postId)
        : [...prevExpandedPosts, postId]
    );
  };

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

  useEffect(() => {
    const fetchPastLikes = async () => {
      const updatedPastLikedPosts: number[] = [];

      // Fetch past likes for each post
      for (const post of Posts) {
        const postId = post[0];
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: postId,
            email: localStorage.getItem("token"),
          }),
        };

        try {
          const response = await fetch(
            "http://127.0.0.1:5000/check-likes",
            requestOptions
          );
          const data = await response.json();

          if (data.value === "Liked") {
            updatedPastLikedPosts.push(postId);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      // Update the PastLikedPosts state
      setPastLikedPosts(updatedPastLikedPosts);
    };

    fetchPastLikes();
  }, [Posts]);

  const handlePostLikes = (postId: number) => {
    if (email !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          email: email,
        }),
      };
      fetch("http://127.0.0.1:5000/post-liked", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const updatedLikedPosts = [...LikedPosts, postId];
          setLikedPosts(updatedLikedPosts);
          updateLikesCount(postId, data.likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      window.alert("You need to log in first!");
    }
  };

  const handleDislike = (postId: number) => {
    if (email !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          email: email,
        }),
      };
      fetch("http://127.0.0.1:5000/post-disliked", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const updatedLikedPosts = LikedPosts.filter((id) => id !== postId);
          setLikedPosts(updatedLikedPosts);
          updateLikesCount(postId, data.likes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      window.alert("You need to log in first!");
    }
  };

  const updateLikesCount = (postId: number, likesCount: number) => {
    const updatedPosts = Posts.map((post) => {
      if (post[0] === postId) {
        post[5] = likesCount;
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const updateCommentCount = (postId: number, commentCount: number) => {
    const updatedPosts = Posts.map((post) => {
      if (post[0] === postId) {
        post[9] = commentCount;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCancelComment = () => {
    setShowCommentBox(false)
   
  };
  const handleNewComment = (postId: number) => {
    if (email!==""){
    setShowCommentBox(true)
    setCommentBox("");
    handleGetComments(postId);
    setCommentBoxId(postId); // Set the ID of the post to open the comment box
  }

    else{
      window.alert("You need to log in first!")
    }
  };

  const handlePostComment = (postId: number) => {
    // Handle posting the comment
    if (email !== "" && CommentBox.trim() !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: CommentBox, postId: postId, email: email }),
      };

      fetch("http://127.0.0.1:5000/comment-on-post", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            data.comment_count
           
            updateCommentCount(postId, data.comment_count);
          // Handle successful comment post
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        setShowCommentBox(false)
    }
  };

  const handleGetComments = (postId: number) => {
    
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({postId: postId}),
        };
  
        fetch("http://127.0.0.1:5000/fetch-comment-posts", requestOptions)
          .then((response) => response.json())
          .then((data) => {
                setComments(data.post_comments);
                
              
             
            // Handle successful comment post
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }
  useEffect(() => {
    const handleCanDelete = async () => {
      const canDeletePosts: number[] = [];
    
      // Fetch past likes for each post
      for (const comment of Comments) {
        const commentID = comment[0];
        const promptID = comment[1];
        const UserID = comment[2];
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                UserID: UserID,
                promptID:promptID,
                email: email,
              }),
            
            };

        try {
          const response = await fetch(
            "http://127.0.0.1:5000/can-delete",
            requestOptions
          );
          const data = await response.json();

          if (data.value === "Yes") {
            canDeletePosts.push(commentID);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      // Update the PastLikedPosts state
      setCanDeletePosts(canDeletePosts);
    };

    handleCanDelete();
  }, [Comments]);
  const handleDeleteComment = (postID:number,commentID:number) =>{
    if (email!==""){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({commentID: commentID}),
      };

      fetch("http://127.0.0.1:5000/delete-comment", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const count =data.value;
            updateCommentCount(postID,count)
            setShowCommentBox(false)
              
            
           
          // Handle successful comment post
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
  }

  
  const handleApplicableLaws = (postId: number) => {
    setShowLaws(true)
    setApplicableLawsBox("");
    setapplicablelawsId(postId);
  };

  const handleCloseLaws = () =>{
    setShowLaws(false)
  }

  const renderedComments=Comments.map((comment) => {
        
    const commentID = comment[0];
    const promptID = comment[1];
    const UserID = comment[2];
    const Name = comment[3];
    const commentcontent = comment[4];
    const canDelete = CanDeletePosts.includes(commentID);
    
   
    return (
      <div key={commentID}>
        
        <li className="comments-card">
        {canDelete &&(
            <button className="comment-del" onClick={() => handleDeleteComment(promptID,commentID)}>Delete Comment</button>
        )}
        <h3 className="commentie">{Name}</h3>
          
        <p className="comment-cont">{commentcontent}</p>
        </li>
      </div>
    );
 
  
});
  const renderedPosts = Posts.map((post) => {
    const postId = post[0];
    const userId = post[1];
    const username = post[2];
    const topics = post[3];
    const content = post[4];
    let likes = post[5];
    const laws = post[6];
    const time = post[7];
    const commentsCount= post[9];
    
    const isLiked = LikedPosts.includes(postId);
    const isPastLiked = PastLikedPosts.includes(postId);

    const isCommentBoxOpen = commentBoxId === postId; // Check if comment box should be open for this post

    const isLawsBoxOpen = applicablelawsId === postId;

    const lawsList = laws.split("#").map((law: string, index: number) => ( // specify type for index
    
    <li key={index}>{law.replaceAll(', ', '')}</li>
  ));
  
  
  
    const isExpanded = expandedPosts.includes(postId);

   
    
      
    return (
      <>

      
        <li key={postId} className="case-card-posts">
        <div className="Allposts-grid">
          <h5 className="username-posts">{username} says,</h5>
          <h3 className="topics-posts">{topics}</h3>
          <p className="time-posts">{formatDistance(subDays(new Date(time),0),new Date())} ago</p>
          {isExpanded ? (
          <p className="post-content">{content}</p>
        ) : (
          <p>
            {content.slice(0, 100)}
            {content.length > 10 && "... "}
            {content.length > 25 && (
              <button className="read-more-btn-allposts" onClick={() => toggleExpansion(postId)}>Read More</button>
            )}
          </p>
          )}
          {isExpanded && (
            <p>
          <button className="read-more-btn-allposts" onClick={() => toggleExpansion(postId)}>Read Less</button>
          </p>
          )}
          
          <p className="likes-posts">Likes: {likes}</p>
          <p className="comment-posts">Comments: {commentsCount}</p>
          </div>
          <div className="post-buttons">
            {!isLiked && !isPastLiked ? (
              <button className="allpost-button" onClick={() => handlePostLikes(postId)}>
                Like
              </button>
            ) : (
              <button className="green-button" onClick={() => handleDislike(postId)}>
                Liked
              </button>
            )}
            <button className="allpost-button" onClick={() => handleApplicableLaws(postId)}>Applicable Laws</button>
           
            <button className="allpost-button" onClick={() => handleNewComment(postId)}>
              Comment
            </button>
            
          </div>
          {isLawsBoxOpen && ShowLaws &&(
            <>
            <button className="allpost-button" onClick={() => handleCloseLaws()}>Close</button>
             <ol>
            <h1>Applicable Laws</h1>
            {lawsList}
          </ol>
          </>
          )}

          {isCommentBoxOpen && ShowCommentBox &&(
            <>
              <div className="comments-section">
                <textarea
                  className="comment-box"
                  placeholder="Enter comment"
                  value={CommentBox}
                  onChange={(e) => setCommentBox(e.target.value)}
                />
                <button className="comment-button2" onClick={() => handlePostComment(postId)}>Post Comment</button>
                <button className="comment-button" onClick={() => handleCancelComment()}>Cancel</button>
                </div>
              <div>
              <h3>Post Comments:</h3>
              <div>{renderedComments}</div>
              </div>
              </>
            )}
        </li>
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

export default AllPosts;