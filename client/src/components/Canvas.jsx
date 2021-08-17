import { useEffect, useRef } from "react";

const Canvas = (props) => {
  const { items, targetcircle, selected } = props;

  const canvasRef = useRef(null);

  const drawCircle = (canvas, x, y, d, id, fill) => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, d, 0, 2 * Math.PI);
    ctx.font = "16px Arial";
    ctx.fillText(id, Number(x) - 5, Number(y) + 5);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.stroke();
  };

  const drawLine = (canvas, x, y, x2, y2, id, fill) => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width += 0;

    if (items) {
      Object.keys(items).forEach((key) => {
        drawLine(
          canvas,
          items[key].center.x,
          items[key].center.y,
          items[key].x,
          items[key].y
        );

        drawCircle(
          canvas,
          items[key].x,
          items[key].y,
          items[key].diameter,
          items[key].id
        );
      });
    }

    if (targetcircle) {
      drawCircle(
        canvas,
        targetcircle.x,
        targetcircle.y,
        30,
        selected,
        "#fffaf04d"
      );
    }
  }, [items, targetcircle]);

  return (
    <section>
      <canvas className="canvas" ref={canvasRef} {...props}></canvas>
    </section>
  );
};

export default Canvas;
