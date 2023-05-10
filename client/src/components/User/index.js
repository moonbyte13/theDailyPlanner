import React, { useEffect, useState } from 'react';

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Set the user state to the parsed user data
    setUser(userData);
  }, []);

  // If the user data is not yet loaded, display a loading indicator
  if (!user) {
    return <div>Loading...</div>;
  }

  // Otherwise, display the user's profile picture and name
  return (
    <div className="user">
      <img src={user.picture} alt="Profile" />
      <span>{user.name}</span>
    </div>
  );
};

export default User;
