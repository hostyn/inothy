import { motion } from "framer-motion";
import { useMemo } from "react";

export const Page = ({
  index,
  renderPage,
  x,
  onDragEnd,
  visualizedItems,
  onDragStart,
}) => {
  const child = useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${100 / visualizedItems}%`,
        height: "100%",
        x,
        left: `${(index * 100) / visualizedItems}%`,
        right: `${(index * 100) / visualizedItems}%`,
      }}
      draggable
      drag="x"
      dragElastic={1}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      {child}
    </motion.div>
  );
};

Page.displayName = "page";
