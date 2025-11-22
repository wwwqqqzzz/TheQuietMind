
import React from 'react';

export const StaticContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`${className} opacity-100 transform-none`}>
      {children}
    </div>
  );
};
