// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <p>{user.user_id}</p>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.family_name}</p>
      <code>{JSON.stringify(user, null, 3)}</code>
    </Fragment>
  );
};

export default Profile;