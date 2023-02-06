import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Page } from "./Page";

const transition = {
  type: "spring",
  bounce: 0,
};

export const VirtualizedPage = ({
  children,
  visualizedItems,
  paddingItems,
}) => {
  const range = [
    ...[...Array(paddingItems).keys()].map((i) => i - paddingItems),
    ...Array(visualizedItems).keys(),
    ...[...Array(paddingItems).keys()].map((i) => i + visualizedItems),
  ];

  const x = useMotionValue(0);
  const containerRef = useRef();
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const calculateNewX = () =>
    -index *
    (containerRef.current?.clientWidth
      ? containerRef.current?.clientWidth / visualizedItems
      : 0);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleEndDrag = (e, dragProps) => {
    setDragging(false);
    const clientWidth = containerRef.current?.clientWidth
      ? containerRef.current?.clientWidth / visualizedItems
      : 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }

    const shift = Math.trunc(
      (Math.abs(offset.x) + clientWidth / visualizedItems) / clientWidth
    );

    if (shift === 0) {
      animate(x, calculateNewX(), transition);
      return;
    }

    setIndex((index) => (offset.x < 0 ? index + shift : index - shift));
  };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const interval = dragging
      ? null
      : setInterval(() => setIndex((index) => index + 1), 5000);
    return () => clearInterval(interval);
  }, [dragging]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      {range.map((rangeValue) => {
        return (
          <Page
            key={rangeValue + index}
            x={x}
            onDragEnd={handleEndDrag}
            onDragStart={handleDragStart}
            index={rangeValue + index}
            renderPage={children}
            visualizedItems={visualizedItems}
          />
        );
      })}
    </motion.div>
  );
};

VirtualizedPage.displayName = "VirtualizedPage";
