import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NewPost.css";
function NewPost({ isAuth }) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");

  const postCollection = collection(db, "posts");

  // Function to create a new post
  const createPost = async () => {
    // Check if any field is empty
    if (!title || !descr || !postText || !image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
        timer: 3000, // Show alert for 3 seconds
        showConfirmButton: false, // Remove the confirmation button
      });
      return; // Exit the function if any field is empty
    }

    try {
      await addDoc(postCollection, {
        title,
        descr,
        postText,
        image,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Post created successfully.",
        timer: 3000, // Show success alert for 3 seconds
        showConfirmButton: false, // Remove the confirmation button
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the post.",
        timer: 3000, // Show error alert for 3 seconds
        showConfirmButton: false, // Remove the confirmation button
      });
      console.error("Error creating post: ", error);
    }
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div
      className="flex ps-16 pt-10 items-center"
      onChange={() => window.scrollTo(0, 0)}
    >
      <div className="text-2xl pt-5">
        <h1>Creating New blog</h1>
        <div className="p-4" style={{ display: "flex" }}>
          <input
            className="border border-black-300  text-black p-4 rounded-xl border-gray-950"
            placeholder="Enter the title..."
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className=" border border-black-300 text-black p-4 rounded-xl border-gray-950 ml-5"
            placeholder="Enter the description..."
            onChange={(e) => setDescr(e.target.value)}
          />
        </div>
        <div className="p-4 items-start">
          <textarea
            className="border border-black-300 w-[1000px] text-black p-4 h-80 rounded-xl border-gray-950"
            placeholder="Enter content..."
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="p-4" style={{ display: "flex" }}>
          <input
            className="border border-black-300 mr-5 text-black p-4 rounded-xl border-gray-950"
            placeholder="Enter the image link..."
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="btn" onClick={createPost}>
            Submit Post
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
