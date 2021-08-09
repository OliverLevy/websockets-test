import { useEffect, useRef } from "react";

const Canvas = (props) => {
  const { items, targetcircle } = props;

  const canvasRef = useRef(null);

  const draw = (canvas, x, y, id, fill) => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.font = "16px Arial";
    ctx.fillText(id, Number(x) - 5, Number(y) + 5);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width += 0;

    if (items) {
      Object.keys(items).map((key) => {
        return draw(
          canvas,
          items[key].position.x,
          items[key].position.y,
          items[key].id
        );
      });
    }

    if (targetcircle) {
      draw(canvas, targetcircle.x, targetcircle.y, "", "#fffaf04d");
    }
  }, [items, targetcircle]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
