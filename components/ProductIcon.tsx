'use client';

import React from 'react';
import {
  Headphones,
  Zap,
  Cable,
  Radio,
  BatteryCharging,
  MapPin,
  Volume2,
  Shield,
  Cpu,
  Watch,
  Sparkles,
  Layers,
  Package,
  LucideProps,
} from 'lucide-react';

interface ProductIconProps extends LucideProps {
  name: string;
}

export function ProductIcon({ name, ...props }: ProductIconProps) {
  switch (name) {
    case 'Headphones':
      return <Headphones {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Cable':
      return <Cable {...props} />;
    case 'Radio':
      return <Radio {...props} />;
    case 'BatteryCharging':
      return <BatteryCharging {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Volume2':
      return <Volume2 {...props} />;
    case 'Shield':
      return <Shield {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Watch':
      return <Watch {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    default:
      return <Package {...props} />;
  }
}
