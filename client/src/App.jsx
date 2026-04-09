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
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b p-4 text-center font-bold text-xl">
        Instagram
      </div>

      <div className="max-w-xl mx-auto bg-white p-4 mt-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Create Post</h2>

        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 mb-2 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          placeholder="Write a caption..."
          className="w-full border p-2 mb-2 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      <div
        className="max-w-5xl mx-auto mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt="post"
                className="w-full h-60 object-cover"
              />

              <div className="p-3">
                <p className="font-medium text-sm">{post.caption}</p>

                <button
                  onClick={() => deletePost(post._id)}
                  className="text-red-500 text-xs mt-1"
                >
                  Delete
                </button>

                <div className="mt-2 text-xs text-gray-600 max-h-20 overflow-y-auto">
                  {post.comments.map((c, i) => (
                    <p key={i}>• {c.text}</p>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Add comment..."
                  className="w-full border mt-2 p-1 rounded text-xs"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(post._id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
