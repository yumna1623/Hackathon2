import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../Config";

function Home() {
    const handleLogout = () => {
        signOut(auth)
    }
  return (
    <div>
      <p>Home</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
