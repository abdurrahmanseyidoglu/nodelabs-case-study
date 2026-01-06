import { ChartsLabelCustomMarkProps } from "@mui/x-charts";

export default function HTMLCircle({
  className,
  color,
}: ChartsLabelCustomMarkProps) {
  return (
    <div
      className={className}
      style={{ borderRadius: "100%", background: color }}
    />
  );
}
