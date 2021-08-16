import { useEffect, useState } from "react";
import socket from "../socket-config";

const StateMessage = () => {
  const [msg, setMsg] = useState("loading...");

  useEffect(() =>{

    socket.on("set-state-message", (msg) => {
      setMsg(msg);
    });

  },[])

  return (
    <div>
      <p>{msg}</p>
    </div>
  );
};

export default StateMessage;
