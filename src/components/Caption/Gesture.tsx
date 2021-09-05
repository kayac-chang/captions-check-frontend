import React, { useRef, useEffect, ReactNode, useState } from "react";
import { listen, Vector } from "../../utils";

export enum Direction {
  None = 0,
  Left = 1,
  Right = -1,
}

interface GestureState {
  direction: Direction;
  movement: number;
}

const initialState: GestureState = {
  direction: 0,
  movement: 0,
};

type GestureProps = {
  children?: (state: GestureState) => ReactNode;
  className?: string;
};
export function Gesture({ children, className }: GestureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<GestureState>(initialState);

  useEffect(() => {
    if (!ref.current) return;

    let initial: Vector | undefined;

    const observer = listen(ref.current)
      .add("pointerdown", ({ x, y }) => (initial = { x, y }))
      .add("pointermove", (event) => {
        if (!initial) return;

        const diff = initial.x - event.x;

        setState({
          direction: Math.sign(diff) as Direction,
          movement: Math.abs(diff),
        });
      })
      .add("pointerup", () => {
        initial = undefined;
        setState(initialState);
      });

    return () => void observer.clear();
  }, [setState]);

  return (
    <div className={className} ref={ref}>
      {children?.(state)}
    </div>
  );
}
