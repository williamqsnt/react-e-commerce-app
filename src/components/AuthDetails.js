import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./auth/utils/firebase";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import avatar from '../assets/icons/profile.svg';

const Profile = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/Account"); 
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <Menu />
          <div style={{display : 'flex', flexDirection : 'column'  ,alignItems :'center', justifyContent : 'center', width : '100%', height : '100vh'}}>
            <h1>Profile</h1>
            <img src={avatar} alt="avatar profil" width={150} />
            <p>{authUser.email}</p>
            <button onClick={userSignOut} style={{color : 'red', backgroundColor : 'unset', border :'none'}}>Se déconnecter</button>
          </div>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default Profile;
