import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./Config";

function App() {
  const [user, setUser] = useState("no-user");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  if (user === "no-user") 
    return <h1>Loading...</h1>;
  

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to={"./Login"} />} />
      <Route
        path="/Login"
        element={!user ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/SignUp"
        element={!user ? <SignUp /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
