//path: pages/authentication.js
import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthForm = () => {
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [semail, setSemail] = useState('');
  const [spassword, setSpassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email: semail, password: spassword }),
      });
      if (!response.ok) {
        toast.error("Signup Error");
      }
      else {
        toast.success("User created successfully");

      }

    } catch (error) {
      toast.error("Signup failed");

    }
    setProgress(100);
  };

  const handleLogin = async (e) => {


    e.preventDefault();
    setProgress(50);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Login Failed");

      } else {
        const data = await response.json();
        if (data.success === true) {
          const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
          const name = decodedToken.name;
          toast.success("Welcome..!  " + name);

        } else {
          toast.error("Login Failed");
        }
      }
    } catch (error) {
      toast.error("Login Failed");
    }
    setProgress(100);
  };

  return (
    <>
      <LoadingBar
        progress={progress}
        color="#f11946"
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>

        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>

        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={semail}
                onChange={(e) => setSemail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={spassword}
                onChange={(e) => setSpassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
