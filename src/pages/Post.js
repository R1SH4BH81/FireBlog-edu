import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./NewPost.css";

function Comentario({ id, postCollection }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  // Function to create a new comment
  const createComentario = async () => {
    if (comment === "") {
      // Handle empty comment case (optional)
    } else {
      await addDoc(postCollection, {
        postId: id,
        comment,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });

      setCommentList([
        ...commentList,
        {
          comment,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        },
      ]);
      setComment("");
    }
  };

  useEffect(() => {
    // Fetch comments related to the post
    const getComment = async () => {
      const querySnapshot = await getDocs(
        query(postCollection, where("postId", "==", id))
      );
      setCommentList(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getComment();
  }, [id, postCollection]);

  // Function to delete a comment
  const deleteComentario = async (id, authorId) => {
    const postDoc = id ? doc(db, "comments", id) : null;

    if (postDoc) {
      await deleteDoc(postDoc);
      navigate(`/post/${id}`);
    } else {
      console.error("Invalid comment ID.");
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl pb-4">
        Leave your feedback on the post!
      </h1>
      <div>
        <div className="flex flex-col sm:flex-row">
          <input
            className="border border-black-200 w-full sm:w-[550px] text-black p-2 sm:p-4 rounded border-gray-950"
            placeholder="Comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="btn mt-4 sm:mt-0 sm:ml-5" onClick={createComentario}>
            Comment
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-5">
        <h1 className="text-xl sm:text-2xl font-bold">Comments</h1>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <div>
              <h1 className="w-full">{comment.comment}</h1>
              {comment.author.id === auth.currentUser.uid && (
                <div
                  className="h-12 text-white"
                  onClick={() =>
                    deleteComentario(comment.id, comment.author.id)
                  }
                >
                  {/* <FaTrashAlt size="30px" color="red" /> */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Post({ commentList = [] }) {
  // Provide default value for commentList
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [contador, setContador] = useState(0);
  const postCollection = collection(db, "comentario");

  // Function to handle like button click
  function SomaHeart() {
    if (
      localStorage.getItem("liked") === "false" ||
      localStorage.getItem("liked") === null
    ) {
      setContador(contador + 1);
      localStorage.setItem("liked", true);
    } else {
      console.log("Liked state toggled off");
      localStorage.removeItem("liked");
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() });
          window.scrollTo(0, 0);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex text-center items-center p-72 justify-center">
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-black" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-6 md:pt-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pb-2">
          {post.title}
        </h1>

        <div className="flex text-base sm:text-lg gap-1 pb-5">
          by:{" "}
          <strong>
            <p>{post.author.name}</p>
          </strong>
        </div>
        <div className="flex items-center gap-4 sm:gap-7">
          <div className="flex gap-2">
            <FaRegHeart
              onClick={SomaHeart}
              className="cursor-pointer"
              size="24px"
              md="30px"
            />
            <p className="font-xl">{contador}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center rounded-lg justify-center">
        <img
          className="p-4 sm:p-6 md:p-8 w-full md:w-[900px] lg:w-[1100px] object-cover h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
          src={post.image}
          alt="Post"
        />
      </div>
      <div className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wider px-4 sm:px-8 md:px-16 lg:px-32 indent-6 sm:indent-8 md:indent-10">
        <p>{post.postText}</p>
      </div>
      <section id="comentario">
        <Comentario id={id} postCollection={postCollection} />
      </section>
    </div>
  );
}

export default Post;
