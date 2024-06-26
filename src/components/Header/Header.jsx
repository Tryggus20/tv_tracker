import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const history = useHistory();
  const { userLoggedIn } = useAuth();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      history.push("/login");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <nav>
      {
        userLoggedIn ? (
          <>
            <button onClick={handleSignOut}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )
      }
    </nav>
  );
};

export default Header;
