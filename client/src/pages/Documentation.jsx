import obj from "../example-obj.json";
import { useState } from "react";

const Documentation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <section className="doc">
      <p>
        This app is built using websockets as the main way to communicate
        between the frontend, server and pendulums. <br />
        However there are a couple of REST endpoints.
      </p>

      <div className="doc__endpoint">
        <h4>server</h4>
        <pre>
          <code>get /pendulums</code>
        </pre>
        <p>
          used to get the positions of the pendulums. <br />
          returns an array of objects{" "}
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? "hide" : "show"}
          </button>
        </p>
        {isOpen && (
          <pre className="doc__code" onClick={() => setIsOpen((prev) => !prev)}>
            <code>{JSON.stringify(obj, null, 2)}</code>
          </pre>
        )}
        <br />

        <pre>
          <code>get /stop</code>
        </pre>
        <p>
          this will send an emergency stop to the server which sends a web
          socket event to stop all pendulums at the same time.
        </p>
      </div>
      <div className="doc__endpoint">
        <h4>pendulum</h4>
        <pre>
          <code>get /position</code>
        </pre>
        <p>
          used to check the position of the pendulum's neighbour. Returns an
          object{" "}
          <button onClick={() => setIsOpen2((prev) => !prev)}>
            {isOpen2 ? "hide" : "show"}
          </button>
        </p>

        {isOpen2 && (
          <pre
            className="doc__code"
            onClick={() => setIsOpen2((prev) => !prev)}
          >
            <code>
              {JSON.stringify(
                { x: "int", y: "int", center: "int", d: "int" },
                null,
                2
              )}
            </code>
          </pre>
        )}
      </div>
    </section>
  );
};

export default Documentation;
