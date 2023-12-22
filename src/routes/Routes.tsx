import React from "react";
import { useAuthValue } from "context/AuthContext";
import {
  About,
  CreatePost,
  Dashboard,
  EditPost,
  Home,
  Login,
  Post,
  Register,
  Search,
} from "pages";

import { Navigate, Route, Routes } from "react-router-dom";

export const MainRoutes = () => {
  const { user } = useAuthValue();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/posts/edit/:id"
        element={user ? <EditPost /> : <Navigate to="/login" />}
      />
      <Route
        path="/posts/create"
        element={user ? <CreatePost /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
