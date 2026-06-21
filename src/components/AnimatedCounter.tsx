import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({
  target,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  style,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView(0.3);
  const value = useAnimatedCounter(isInView ? target : 0, duration, isInView);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={`font-mono-data ${className}`} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
