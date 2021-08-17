import socket from "../socket-config";

const Controls = () => {
  const handleStart = () => {
    socket.emit("start");
  };
  const handleStop = () => {
    socket.emit("stop");
  };
  const handleReset = () => {
    socket.emit("reset");
  };
  return (
    <section className="controls">
      <h3 className="controls__title">Controls</h3>
      <button className="controls__btn" onClick={handleStart}>
        start
      </button>
      <button className="controls__btn" onClick={handleStop}>
        stop
      </button>
      <button className="controls__btn" onClick={handleReset}>
        reset
      </button>
    </section>
  );
};

export default Controls;
