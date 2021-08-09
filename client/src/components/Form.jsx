const Form = ({ x, y, id, handleInputChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <b>Pend {id}: </b>
      <label htmlFor="x">x:</label>
      <input
        type="range"
        step="1"
        max="400"
        name="x"
        value={x}
        onChange={(e) => handleInputChange(id, "x", e)}
      />
      <label htmlFor="y">y:</label>
      <input
        type="range"
        step="1"
        max="400"
        name="y"
        value={y}
        onChange={(e) => handleInputChange(id, "y", e)}
      />
    </form>
  );
};

export default Form;
