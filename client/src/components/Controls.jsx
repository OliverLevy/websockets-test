import socket from '../socket-config'

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
    <section>
      <h3>controls</h3>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </section>
  );
};

export default Controls;
