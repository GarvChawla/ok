import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleDeleteUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users = users.filter((user) => user.id !== currentUser.id);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('currentUser');
      alert('User deleted');
      navigate('/signup');
    }
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteUser}>Delete User</button>
    </nav>
  );
};

export default Navbar;
