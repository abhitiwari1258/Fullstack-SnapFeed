import { useState } from "react";
// import API from "../api";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:5000/post");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handlePost = async () => {
    if (!imageUrl || !caption) return;

    const res = await axios.post("http://localhost:5000/post", {
      imageUrl,
      caption,
    });

    console.log(res);

    setPosts([res.data, ...posts]);

    setImageUrl("");
    setCaption("");
  };

  const deletePost = async (postId) => {
    alert("Post deleted Successfully");
    try {
      await axios.delete(`http://localhost:5000/post/${postId}/deletePost`);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (postId, text) => {
    if (!text) return;
    // console.log(postId);
    // console.log(text)

    const res = await axios.put(
      `http://localhost:5000/post/${postId}/comment`,
      { text },
    );

    // console.log("Res : ", res)

    setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
  };
  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h1>Instagram</h1>
      <br />
      <hr />
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Image url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br />
      <br />

      <textarea
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handlePost}>Post</button>

      <hr />

      <h2>Feed</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: "30px" }}>
            <img
              src={post.imageUrl}
              alt="post"
              width="400"
              height="250"
              style={{ objectFit: "cover" }}
            />

            <p>{post.caption}</p>

            <button onClick={() => deletePost(post._id)}>Delete Post</button>

            <h4>Comments:</h4>
            {post.comments.map((c, index) => (
              <p key={index}>• {c.text}</p>
            ))}

            <input
              type="text"
              placeholder="Add comments"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // console.log(e)

                  handleComment(post._id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
