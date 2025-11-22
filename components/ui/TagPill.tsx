
import React from 'react';

export const TagPill = ({ label, onClick, active }: { label: string, onClick?: () => void, active?: boolean }) => (
  <span 
    onClick={onClick}
    className={`
      text-[9px] uppercase tracking-[0.15em] px-3 py-1 border whitespace-nowrap
      ${onClick ? 'cursor-pointer' : ''}
      ${active 
        ? 'border-[var(--border-strong)] text-[var(--text-main)]' 
        : 'border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)]'}
    `}
  >
    {label}
  </span>
);
