import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";

import { Navbar, Footer } from "./components";

import { MainRoutes } from "routes/Routes";
import { useAuthentication } from "hooks";

function App() {
  const [user, setUser] = useState<User | null>();
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <MainRoutes />
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
