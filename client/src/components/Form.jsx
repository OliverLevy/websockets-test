const Form = ({ x, y, id, handleInputChange, cWidth, cHeight, gravity }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <b>Pend {id}: </b>
      <label htmlFor="x">x:</label>
      <input
        type="range"
        step="1"
        max={cWidth}
        name="x"
        value={x}
        onChange={(e) => handleInputChange(id, "x", e)}
      />
      <label htmlFor="y">y:</label>
      <input
        type="range"
        step="1"
        max={cHeight}
        name="y"
        value={y}
        onChange={(e) => handleInputChange(id, "y", e)}
      />
      <input
        type="range"
        step=".1"
        max="3"
        min=".1"
        name="gravity"
        value={gravity}
        onChange={(e) => handleInputChange(id, "gravity", e)}
      />

    </form>
  );
};

export default Form;
