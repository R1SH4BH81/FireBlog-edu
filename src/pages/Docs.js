import React from "react";
import { Link } from "react-router-dom";

// The navigation links for the table of contents
const TableOfContents = () => (
  <div
    className="sticky bg-[#333] text-white top-1 border border-black-200 p-4 shadow-md"
    style={{ borderRadius: "15px" }}
  >
    <h2 className="text-xl font-bold">Table of Contents</h2>
    <ul className="list-disc pl-5">
      <li>
        <a href="#new-post">NewPost Component</a>
      </li>
      <li>
        <a href="#home-page">HomePage Component</a>
      </li>
      <li>
        <a href="#post">Post Component</a>
      </li>
      <li>
        <a href="#firebase">Firebase Integration</a>
      </li>
    </ul>
  </div>
);

const Docs = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <TableOfContents />

      <div className="mt-8">
        <section id="new-post">
          <h1 className="text-3xl font-bold mb-4">NewPost Component</h1>
          <p className="mb-4">
            The <code>NewPost</code> component allows users to create new blog
            posts. It includes a form with fields for title, description,
            content, and image link.
          </p>
          <h2 className="text-xl font-semibold mb-2">Imports</h2>
          <ul className="list-disc pl-5">
            <li>
              <code>
                React, {`useEffect`}, {`useState`}
              </code>
              : React hooks for managing state and side effects.
            </li>
            <li>
              <code>addDoc, collection</code>: Firestore methods for adding new
              documents and accessing a collection.
            </li>
            <li>
              <code>db, auth</code>: Firebase configuration for accessing
              Firestore and authentication services.
            </li>
            <li>
              <code>useNavigate</code>: React Router hook for navigation.
            </li>
            <li>
              <code>Swal</code>: SweetAlert2 library for alerts.
            </li>
            <li>
              <code>./NewPost.css</code>: Custom CSS file for form styling.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Component Breakdown</h2>
          <p className="mb-4">
            - <code>useState</code> hooks manage the form fields (title,
            description, content, image). - <code>createPost</code> handles form
            validation, posting data to Firestore, and displaying alerts using
            SweetAlert2. - <code>useEffect</code> checks if the user is
            authenticated; if not, it redirects to the login page. - Alerts are
            shown based on the success or failure of the post creation.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Role in Blog Application
          </h2>
          <p>
            The <code>NewPost</code> component is essential for users to create
            and submit new blog posts, which are then displayed throughout the
            application.
          </p>
        </section>

        <section id="home-page" className="mt-8">
          <h1 className="text-3xl font-bold mb-4">HomePage Component</h1>
          <p className="mb-4">
            The <code>HomePage</code> component displays a list of all blog
            posts. It fetches posts from Firestore and renders them in a grid
            layout.
          </p>
          <h2 className="text-xl font-semibold mb-2">Imports</h2>
          <ul className="list-disc pl-5">
            <li>
              <code>
                React, {`useState`}, {`useEffect`}
              </code>
              : React hooks for managing state and side effects.
            </li>
            <li>
              <code>deleteDoc, getDocs, doc</code>: Firestore methods for
              deleting and fetching documents.
            </li>
            <li>
              <code>FaTrashAlt, IoIosCreate</code>: React Icons for actions like
              deleting and creating posts.
            </li>
            <li>
              <code>Link, useNavigate</code>: React Router components for
              navigation.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Component Breakdown</h2>
          <p className="mb-4">
            - <code>useState</code> manages the list of posts fetched from
            Firestore. - <code>useEffect</code> fetches posts from Firestore on
            component mount and updates the state. - <code>deletePost</code>{" "}
            function deletes posts for authenticated users. - A button for
            navigating to the <code>NewPost</code> component and a grid layout
            for displaying posts.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Role in Blog Application
          </h2>
          <p>
            The <code>HomePage</code> component serves as the main page where
            users can view all blog posts, navigate to create new posts, and
            delete posts if they are authenticated.
          </p>
        </section>

        <section id="post" className="mt-8">
          <h1 className="text-3xl font-bold mb-4">Post Component</h1>
          <p className="mb-4">
            The <code>Post</code> component displays the details of a single
            blog post along with its comments. It includes functionality for
            liking the post and managing comments through the nested{" "}
            <code>Comentario</code> component.
          </p>
          <h2 className="text-xl font-semibold mb-2">Imports</h2>
          <ul className="list-disc pl-5">
            <li>
              <code>
                React, {`useEffect`}, {`useState`}
              </code>
              : React hooks for managing state and effects.
            </li>
            <li>
              <code>useParams, useNavigate</code>: React Router hooks for
              accessing URL parameters and navigation.
            </li>
            <li>
              <code>
                doc, getDoc, getDocs, where, query, deleteDoc, addDoc,
                collection
              </code>
              : Firestore methods for querying and modifying data.
            </li>
            <li>
              <code>
                FaRegHeart, FaRegComment, FaTrashAlt, AiOutlineLoading3Quarters
              </code>
              : React Icons for interactions and loading state.
            </li>
            <li>
              <code>db, auth</code>: Firebase configuration for database access
              and user authentication.
            </li>
            <li>
              <code>./NewPost.css</code>: Custom CSS for styling.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Component Breakdown</h2>
          <p className="mb-4">
            - <code>useParams</code> retrieves the post ID from the URL. -{" "}
            <code>useState</code> manages post data and like counter. -{" "}
            <code>useEffect</code> fetches post details from Firestore and sets
            up the component. - <code>SomaHeart</code> function handles the like
            button click and updates local storage. - The{" "}
            <code>Comentario</code> component is used for managing and
            displaying comments on the post.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Role in Blog Application
          </h2>
          <p>
            The <code>Post</code> component is responsible for displaying the
            full details of a single blog post, including its content, image,
            and comments. It allows users to interact with the post by liking it
            and managing comments.
          </p>
        </section>

        <section id="firebase" className="mt-8">
          <h1 className="text-3xl font-bold mb-4">Firebase Integration</h1>
          <p className="mb-4">
            Firebase provides backend services for authentication and data
            storage in this application. Here’s how Firebase is integrated:
          </p>
          <h2 className="text-xl font-semibold mb-2">Firestore</h2>
          <p className="mb-4">
            Firestore is used as the NoSQL database to store and manage blog
            posts and comments. The methods used include:
            <ul className="list-disc pl-5">
              <li>
                <code>addDoc</code>: Adds new documents to a Firestore
                collection.
              </li>
              <li>
                <code>getDocs</code>: Retrieves documents from a Firestore
                collection.
              </li>
              <li>
                <code>doc</code>: References a specific document in Firestore.
              </li>
              <li>
                <code>deleteDoc</code>: Deletes a specific document from
                Firestore.
              </li>
              <li>
                <code>query</code> and <code>where</code>: Queries Firestore
                with specific conditions.
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-semibold mb-2">Authentication</h2>
          <p className="mb-4">
            Firebase Authentication is used to manage user authentication. The{" "}
            <code>auth</code> object is used to access the current user's
            information and handle authentication-related tasks.
          </p>
          <h2 className="text-xl font-semibold mb-2">Configuration</h2>
          <p className="mb-4">
            Firebase configuration is imported from the <code>firebase</code>{" "}
            file. It initializes Firestore and authentication services, which
            are then used throughout the application.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Docs;
