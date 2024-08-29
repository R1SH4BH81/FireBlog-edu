import React, { useEffect, useState } from "react";
import { deleteDoc, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { collection } from "firebase/firestore";

import { FaTrashAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

function HomePage({ isAuth }) {
  let navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const postCollection = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollection);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    navigate("/");
  };

  return (
    <div className="pt-12">
      <div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Discover what others are thinking...
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 px-4 sm:px-8 md:px-10">
            Have fun browsing and discovering what others are posting, and don't
            forget to share your thoughts too!
          </p>
        </div>

        <div className="flex justify-center items-center mt-8">
          <img
            className="w-[80%] sm:w-[300px] md:w-[400px]"
            src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3992.jpg?w=740&t=st=1706731556~exp=1706732156~hmac=a30c48eb977cfcdcc9be7ff59c9753175865a4bb3bfc6b13ceae6f47f46f9780"
            alt="Inspiration Illustration"
          />
        </div>
        <h2 className="text-center text-2xl sm:text-3xl mt-10">Posts</h2>
      </div>

      <div className="flex gap-4 sm:gap-8 p-4 sm:p-10">
        <div className="fixed bottom-4 right-4" title="Write a new Blog">
          <Link
            to="/new"
            className="flex items-center p-6 pe-12 rounded-full text-black"
          >
            <img src="/pen.png" alt="Pen Icon" className="w-12 h-12" />
          </Link>
        </div>

        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1 sm:p-1">
          {postList.map((post) => (
            <div className="p-1" key={post.id}>
              <div className="flex w-full object-cover  pt-3">
                <div
                  className="pt-4 p-1 cursor-pointer rounded-xl "
                  style={{ width: "98%", marginLeft: "1%" }}
                  onClick={() =>
                    isAuth ? navigate(`/post/${post.id}`) : navigate("/login")
                  }
                >
                  <img
                    className="rounded-lg object-cover w-full h-60"
                    src={post.image}
                    alt="Post"
                  />
                  <h1 className="pt-2 font-bold text-xl sm:text-2xl">
                    {post.title}
                  </h1>
                  {/* <p className="text-lg pt-2">{post.descr}</p> */}
                  <p className="font-semibold">by: {post.author.name}</p>

                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <div
                      className="h-6 text-white float-right mb-2"
                      onClick={() => deletePost(post.id)}
                      style={{ cursor: "pointer", marginTop: "-20px" }}
                    >
                      <FaTrashAlt size="30px" color="red" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
