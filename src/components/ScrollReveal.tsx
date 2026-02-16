import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: string;
  className?: string;
  as?: "div" | "section";
}

const animationClasses: Record<Animation, { initial: string; visible: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-in": {
    initial: "opacity-0",
    visible: "opacity-100",
  },
  "fade-left": {
    initial: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
};

const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = "0ms",
  className,
  as: Tag = "div",
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const anim = animationClasses[animation];

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? anim.visible : anim.initial,
        className
      )}
      style={{ transitionDelay: isVisible ? delay : "0ms" }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
