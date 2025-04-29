import React, { useState, useEffect } from 'react';
import './NavBar.css';
import TaskForm from '../TaskForm';
import { auth } from '../../config'; // your firebase config
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function NavBar() {
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
        console.log("User logged out");
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
          <a className="navbar-brand" href="#">TASK TRACKER</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <button className="nav-link active btn-add" onClick={() => setShowTaskForm(!showTaskForm)}>
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
