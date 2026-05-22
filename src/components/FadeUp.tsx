import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  /** Disable viewport-triggered animation (for above-the-fold content). */
  immediate?: boolean;
};

export function FadeUp({ children, delay = 0, immediate = false, ...rest }: FadeUpProps) {
  const animationProps = immediate
    ? { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.div
      {...animationProps}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

/** Wraps children in motion.div with staggered fade-up on viewport entry. */
export function FadeUpStagger({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};
