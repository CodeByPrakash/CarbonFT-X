import { useInView } from '@/hooks/useInView';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressRing({
  percentage,
  size = 180,
  strokeWidth = 10,
  color = '#52B788',
  bgColor = '#E9ECEF',
  label,
  showPercentage = true,
  className = '',
}: ProgressRingProps) {
  const { ref, isInView } = useInView(0.3);
  const animatedValue = useAnimatedCounter(isInView ? percentage : 0, 1200, isInView);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
          <span className="text-[3.2rem] md:text-[4rem] font-bold" style={{ color }}>
            {Math.round(animatedValue)}
          </span>
          {label && <span className="text-[1.2rem] text-gray-500 mt-1">{label}</span>}
        </div>
      )}
    </div>
  );
}
