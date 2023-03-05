import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const {Token} =useParams();



  const decodeToken = (token) => {
    if (!token) return null;
  
    const decoded = JSON.parse(atob(token));
    if (decoded.secret !== 'mysecretkey') {
      throw new Error('Invalid token');
    }
  
    return decoded.payload;
  };

  useEffect(() => {
    const fetchUser = async () => { 
      const user = decodeToken(Token);
      setUser(user);
    };
    fetchUser();
  }, []);


  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {user.fname}</h1>
      <button>Logout</button>
    </div>
  );
};

export default Profile;
