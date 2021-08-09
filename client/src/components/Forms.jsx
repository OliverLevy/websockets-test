import Form from "./Form";

const Forms = ({ items, handleSelect, handleInputChange }) => {
  return (
    <div>
      <h4>circle fine adjust</h4>
      {items &&
        Object.keys(items).map((key, i) => {
          const id = items[key].id;
          const x = items[key].position.x;
          const y = items[key].position.y;
          return (
            <div key={i}>
              <Form x={x} y={y} id={id} handleInputChange={handleInputChange} />
            </div>
          );
        })}
      <h4>select circle to move</h4>
      {items && (
        <select onChange={handleSelect}>
          {Object.keys(items).map((key, i) => {
            return <option key={i}>{items[key].id}</option>;
          })}
        </select>
      )}
    </div>
  );
};

export default Forms;
