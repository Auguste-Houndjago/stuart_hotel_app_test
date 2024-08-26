// LordIcon.d.ts
import React from 'react';

interface LordIconProps {
  src?: string;
  trigger?: string;
  size?: string;
  stroke?: string;
  colors?: string;
  style?: React.CSSProperties;
}

declare const LordIcon: React.FC<LordIconProps>;
export default LordIcon;