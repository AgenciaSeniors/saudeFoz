import {
  DoorOpen,
  Baby,
  Syringe,
  HeartPulse,
  Activity,
  Users,
  Brain,
  LifeBuoy,
  ShieldPlus,
  Plane,
  Smile,
  Accessibility,
  ShieldAlert,
  Pill,
  Siren,
  Circle,
  type LucideIcon,
} from 'lucide-react';

/**
 * Explicit map of the icons used by the 15 health sections (see
 * src/lib/sections.ts). Importing them by name — instead of
 * `import * as Icons from 'lucide-react'` and indexing with a runtime key —
 * keeps the bundle tree-shakeable and lets Next's optimizePackageImports work.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  DoorOpen,
  Baby,
  Syringe,
  HeartPulse,
  Activity,
  Users,
  Brain,
  LifeBuoy,
  ShieldPlus,
  Plane,
  Smile,
  Accessibility,
  ShieldAlert,
  Pill,
  Siren,
};

export function SectionIcon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Circle;
  return <Icon size={size} aria-hidden className={className} />;
}
