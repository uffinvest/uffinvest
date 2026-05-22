import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
        <span className="text-gold mr-2">—</span>
        {children}
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ originX: 0 }}
        className="mt-3 h-px w-10 bg-gold"
      />
    </div>
  );
}
