import { useEffect, useState } from "react";
import Instructions from "../components/Instructions";
import Forms from "../components/Forms";
import Canvas from "../components/Canvas";
import Controls from "../components/Controls";
import StateMessage from "../components/StateMessage";
import axios from "axios";
import socket from "../socket-config";

const cWidth = 600;
const cHeight = 600;

const Main = () => {
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState("1");
  const [targetCircle, setTargetCircle] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/get-pendulums")
      .then((suc) => {
        setItems(suc.data);
      })
      .catch((err) => console.log(err));

    socket.on("init", (obj) => {
      setItems(obj);
    });
    socket.on("new-position", (obj) => {
      setItems(obj);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleCanvasClick = (e) => {
    const id = selected;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newValue = items[id];
    newValue.x = x;
    newValue.y = y;

    socket.emit("set-canvas-position", id, newValue);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPosition = { x: x, y: y };

    setTargetCircle(newPosition);
  };

  const handleInputChange = (id, key, e) => {
    const newValue = items[id];
    newValue[key] = Number(e.target.value);
    socket.emit("set-position-input", id, key, newValue);
  };

  return (
    <div>
      <Instructions />
      <StateMessage />
      <Controls />
      <Forms
        items={items}
        handleSelect={handleSelect}
        handleInputChange={handleInputChange}
        cWidth={cWidth}
        cHeight={cHeight}
      />
      <Canvas
        height={cHeight}
        width={cWidth}
        style={{ background: "grey" }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTargetCircle(null)}
        items={items}
        targetcircle={targetCircle}
        selected={selected}
      />
    </div>
  );
};

export default Main;
