import { useEffect, useState } from "react";
import io from "socket.io-client";
import Instructions from "./components/Instructions";
import Forms from "./components/Forms";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const socket = io("http://localhost:4000");

function App() {
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState("1");
  const [targetCircle, setTargetCircle] = useState(null);

  useEffect(() => {
    socket.on("init", (obj) => {
      console.log(obj);
      setItems(obj);
    });
    socket.on("new-position", (obj) => {
      // console.log(999, obj);
      setItems(obj);
    });
  }, []);

  const handleReset = () => {
    console.log("resetting");
    socket.emit("reset");
  };

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPosition = { x: x, y: y };
    socket.emit("set-position", selected, newPosition);
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

  const handleInputChange = (id, name, e) => {
    // console.log({ key, name, e });
    const newPosition = items[id].position;
    newPosition[name] = Number(e.target.value);
    socket.emit("set-position-test", id, newPosition);
  };

  const handleStart = () => {
    socket.emit("start");
  };
  const handleStop = () => {
    socket.emit("stop");
  };

  return (
    <div>
      <Instructions />
      <Forms
        items={items}
        handleSelect={handleSelect}
        handleInputChange={handleInputChange}
      />
      <div>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
      </div>
      <Controls handleReset={handleReset} />
      <Canvas
        height="400"
        width="400"
        style={{ background: "grey" }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTargetCircle(null)}
        items={items}
        targetcircle={targetCircle}
      />
    </div>
  );
}

export default App;
