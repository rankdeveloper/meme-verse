export const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const imgVariants = {
  initial: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    scale: [1, 1.05, 1],
    // x: [100, 120, 100],
    rotate: [-10, 5, 0],
  },
};
