import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading, navigate } = useAppContext();
  if (loading) return <p>Loading...</p>;
  return user ? children : navigate("/login");
};

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
