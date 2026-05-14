import type {CSSProperties, HTMLAttributes} from "react";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type SkeletonBlockProps = HTMLAttributes<HTMLDivElement>;

export function SkeletonBlock({className, ...props}: SkeletonBlockProps) {
  return <div aria-hidden="true" className={cn("skeleton-block", className)} {...props} />;
}

type SkeletonTextProps = {
  className?: string;
  lineClassName?: string;
  lines?: number;
  lastLineWidth?: CSSProperties["width"];
};

export function SkeletonText({
  className,
  lineClassName,
  lines = 3,
  lastLineWidth = "100%",
}: SkeletonTextProps) {
  return (
    <div aria-hidden="true" className={cn("space-y-2.5", className)}>
      {Array.from({length: lines}, (_, index) => (
        <SkeletonBlock
          key={index}
          className={cn("h-4 rounded-full", lineClassName)}
          style={index === lines - 1 ? {width: lastLineWidth} : undefined}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({className}: {className?: string}) {
  return <SkeletonBlock className={cn("rounded-full", className)} />;
}
