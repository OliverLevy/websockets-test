const Form = ({
  x,
  y,
  id,
  handleInputChange,
  cWidth,
  cHeight,
  gravity,
  diameter,
  angle,
  length,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <b>Pend {id}: </b>

      <label htmlFor="diameter">diameter: </label>
      <input
        type="range"
        step="1"
        max="100"
        min="1"
        name="diameter"
        value={diameter}
        onChange={(e) => handleInputChange(id, "diameter", e)}
      />
      <label htmlFor="angle">length: </label>
      <input
        type="range"
        step="1"
        max="400"
        min="1"
        name="angle"
        value={length}
        onChange={(e) => handleInputChange(id, "length", e)}
      />
      <label htmlFor="angle">angle: </label>
      <input
        type="range"
        step=".1"
        max="1.6"
        min="-1.6"
        name="angle"
        value={angle}
        onChange={(e) => handleInputChange(id, "angle", e)}
      />
      <label htmlFor="gravity">mass: </label>
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
