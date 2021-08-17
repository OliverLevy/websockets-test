import Form from "./Form";

const Forms = ({ items, handleSelect, handleInputChange, cWidth, cHeight }) => {
  return (
    <section className="forms">
      <div className="forms__section">
        <h3 className="forms__title">Pendulum fine adjust</h3>
        <div className="forms__container">
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
                <Form
                  key={i}
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
              );
            })}
        </div>
      </div>
      <div className="forms__section">
        <h3 className="forms__title">Pendulum selector</h3>
        {items && (
          <select onChange={handleSelect}>
            {Object.keys(items).map((key, i) => {
              return <option key={i}>{items[key].id}</option>;
            })}
          </select>
        )}
      </div>
    </section>
  );
};

export default Forms;
