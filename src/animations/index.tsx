import React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

export function SlideUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.2,
      },
    },
  };

  <AnimatePresence>
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={isInView ? "visible" : ""}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  </AnimatePresence>;
}
