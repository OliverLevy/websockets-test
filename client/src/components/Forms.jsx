import Form from "./Form";

const Forms = ({
  items,
  handleSelect,
  handleInputChange,
  cWidth,
  cHeight,
  gravity,
}) => {
  return (
    <div>
      <h4>circle fine adjust</h4>
      {items &&
        Object.keys(items).map((key, i) => {
          const id = items[key].id;
          const x = items[key].x;
          const y = items[key].y;
          const gravity = items[key].gravity;
          const angle = items[key].angle;
          const length = items[key].length;
          const diameter = items[key].diameter;
          return (
            <div key={i}>
              <Form
                x={x}
                y={y}
                id={id}
                handleInputChange={handleInputChange}
                cWidth={cWidth}
                cHeight={cHeight}
                gravity={gravity}
                angle={angle}
                length={length}
                diameter={diameter}
              />
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
