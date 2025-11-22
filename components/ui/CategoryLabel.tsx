
import React from 'react';

export const CategoryLabel = ({ label }: { label: string }) => (
  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-2">
    {label}
  </span>
);
