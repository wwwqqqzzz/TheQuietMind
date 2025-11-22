import React from 'react';

// Thin stroke width for Zen aesthetic
const STROKE_WIDTH = 1.5;

export const LotusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.5c0 0-3.5 5-3.5 9.5 0 2.5 1.5 4.5 3.5 4.5s3.5-2 3.5-4.5c0-4.5-3.5-9.5-3.5-9.5z" />
    <path d="M12 16.5c0 0-3 2.5-6 2.5S2 16.5 2 12.5C2 8.5 5.5 6 8.5 6" />
    <path d="M12 16.5c0 0 3 2.5 6 2.5s4-2.5 4-6.5c0-4-3.5-6.5-6.5-6.5" />
    <path d="M20 12c0 0-2 1-4 1s-3-2-3-2" />
    <path d="M4 12c0 0 2 1 4 1s3-2 3-2" />
  </svg>
);

export const FeatherIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

export const BookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const AudioIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

export const FilmIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

export const ArchiveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

export const LayersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const SparkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
  </svg>
);

export const ShardIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 22H22L12 2Z" />
    <path d="M12 12L12 22" />
  </svg>
);

export const BrainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.5A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.5A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

export const WandIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 4V2" />
      <path d="M15 16V14" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8L19 13" />
      <path d="M15 9h0" />
      <path d="M17.8 6.2L19 5" />
      <path d="M3 21l9-9" />
      <path d="M12.2 6.2L11 5" />
    </svg>
  );

export const TeaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

export const GlobeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );

export const MoonIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

export const SunIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

export const MenuIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const PenIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.5 8.6L12 19l-3 3-7-7 3-3 .6-2.5L2 2z" /> 
    {/* Simplified pen shape for Zen */}
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);