import { motion, useReducedMotion } from "motion/react";

export function Reveal({ as = "div", className, children, delay = 0, y = 24, ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default Reveal;
