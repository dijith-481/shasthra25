interface Props {
  left: number; // %
  duration: number; // s
  delay: number; // s
  size: number; // px
}

export const Particle = ({ left, duration, delay, size }: Props) => (
  <div
    className="absolute bottom-0 bg-evening-sea-200 rounded-full animate-flow"
    style={{
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  />
);
