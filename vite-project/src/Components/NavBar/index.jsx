import React, { useState, useEffect } from "react";
import "./NavBar.css";
import TaskForm from "../TaskForm";
import { auth } from "../../config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function NavBar({ searchQuery, setSearchQuery }) {
    // Other states...
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [user, setUser] = useState(null);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, []);
  
    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.error("Logout error:", err);
        });
    };
  
    return (
      <>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              TASK TRACKER
            </a>
  
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <div className="nav-left">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search tasks Title or Email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="search-input"
                    />
                    <button className="search-button">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
  
                <div className="nav-right">
                  <button
                    className="nav-link active btn-add"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                  >
                    Add Task
                  </button>
                  {user && (
                    <button className="nav-link logout" onClick={handleLogout}>
                      LogOut
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
  
        {showTaskForm && (
          <div className="task-form-container">
            <TaskForm onCancel={() => setShowTaskForm(false)} />
          </div>
        )}
      </>
    );
  }
  

export default NavBar;
