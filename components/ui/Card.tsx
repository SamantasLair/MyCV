"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  colSpan?: 1 | 2 | 3;
  id?: string;
}

export const Card = ({ children, className, title, description, colSpan = 1, id }: CardProps) => {
  return (
    <motion.div
      id={id}
      data-particle-collider
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className="font-semibold text-base text-slate-200">{title}</h3>}
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
};
