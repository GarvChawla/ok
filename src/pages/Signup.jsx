// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     // Validation for empty fields
//     if (!email || !password || !confirmPassword) {
//       toast.error("All fields are required", {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match", {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     if (users.some((u) => u.email === email)) {
//       toast.error('User already exists', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     const newUser = { id: Date.now(), email, password };
//     localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
//     // Toast notification for successful signup
//     toast.success('New user created!', {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });

//     // Redirect to login page after a delay to show the toast
//     setTimeout(() => navigate('/login'), 3000);
//   };

//   return (
//     <div className="signup-container">
//       <ToastContainer />
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignup}>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Confirm Password" 
//           value={confirmPassword} 
//           onChange={(e) => setConfirmPassword(e.target.value)} 
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an account?{' '}
//         <Link to="/login" className="login-link">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('All fields are required', { position: 'top-right', autoClose: 3000 });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((u) => u.email === email)) {
      toast.error('User already exists', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const newUser = { id: Date.now(), username, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    toast.success('New user created!', { position: 'top-right', autoClose: 3000 });

    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
