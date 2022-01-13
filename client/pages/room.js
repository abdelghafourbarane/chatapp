import React, { useEffect, useContext } from "react";

import { UserContext } from "../context/user/user.context";

function Room() {
  // useEffect(() => {

  // }, []);

  const { state } = useContext(UserContext);

  return (
    <div>
      Room page
      <br />
      <span>
        {state.user.email}
        <br />
        {state.user.joined}
        <br />
        {state.user.username}
      </span>
    </div>
  );
}

export default Room;
