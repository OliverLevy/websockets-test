const Form = ({ id, handleInputChange, gravity, diameter, angle, length }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      <b>Pend {id}: </b>
      <div>
        <label htmlFor="diameter">dia &#8960;: </label>
        <input
          type="range"
          step="1"
          max="100"
          min="1"
          name="diameter"
          value={diameter}
          onChange={(e) => handleInputChange(id, "diameter", e)}
        />
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
    </form>
  );
};

export default Form;
