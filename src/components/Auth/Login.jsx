import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from "../../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log("User Logged In: ", userLoggedIn);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        history.push("/home");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

//   const onGoogleSignIn = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     if (!isSigningIn) {
//       setIsSigningIn(true);
//       try {
//         await doSignInWithGoogle();
//         history.push("/home");
//       } catch (error) {
//         setErrorMessage(error.message);
//         setIsSigningIn(false);
//       }
//     }
//   };

  return (
    <div>
      {userLoggedIn && <Link to="/home" replace={true} />}
      <main>
        <div>
          <div>
            <div>
              <h3>Welcome Back</h3>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <span>{errorMessage}</span>}
            <button type="submit" disabled={isSigningIn}>
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
