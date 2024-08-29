import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Docs from "./pages/Docs";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Post from "./pages/Post";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  function Logout() {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  }

  return (
    <Router>
      <div className="pb-20 overflow-auto">
        <nav className="fixed p-5 md:p-10 flex justify-between w-full h-16 md:h-8 text-white text-center items-center bg-black">
          <div className="flex items-center font-bold justify-center">
            <Link to="/" className="px-2 md:px-3">
              <p className="text-4xl md:text-5xl">FireBlog</p>
            </Link>
          </div>
          <div className="flex space-x-4 md:space-x-8">
            <Link to="/docs">
              <p className="text-white text-lg md:text-xl">Docs</p>
            </Link>
            {!isAuth ? (
              <Link to="/login" className="px-2 md:px-3">
                <FaUserCircle size="30px" md="40px" />
              </Link>
            ) : (
              <Link to="/" onClick={Logout} className="px-4 md:px-5">
                <BiLogOut size="30px" md="40px" />
              </Link>
            )}
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<HomePage isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/new" element={<NewPost isAuth={isAuth} />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
