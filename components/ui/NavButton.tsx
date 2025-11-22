
import React from 'react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const NavButton = ({ label, isActive, onClick, hasDropdown, icon }: { label: string, isActive: boolean, onClick: () => void, hasDropdown?: boolean, icon?: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-1 text-sm tracking-[0.2em] font-serif rounded-none
      ${isActive 
        ? 'text-[var(--text-main)] border-b border-[var(--border-strong)]' 
        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:underline'}
    `}
  >
    {icon && <span className="text-lg">{icon}</span>}
    <span className="uppercase text-[11px] font-medium">{label}</span>
    {hasDropdown && <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />}
  </button>
);
