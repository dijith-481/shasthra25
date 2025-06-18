interface Props {
  left: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}

export const Particle = ({ left, duration, delay, size, color }: Props) => (
  <div
    className="absolute bottom-0 bg-evening-sea-200 rounded-full animate-flow"
    style={{
      backgroundColor: color,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  />
);
