import React, {
  ReactNode,
  UIEvent,
  UIEventHandler,
  useState,
  useCallback,
} from "react";
import clsx from "clsx";

function useScroll<T extends HTMLElement>(): [number, UIEventHandler<T>] {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback(
    (event: UIEvent<T>) => {
      const { scrollTop } = event.target as T;

      requestAnimationFrame(() => setScrollTop(scrollTop));
    },
    [setScrollTop]
  );

  return [scrollTop, onScroll];
}

type VirtualListProps<T> = {
  rowHeight: number;
  visibleCount: number;
  list: T[];
  children?: (item: T) => ReactNode;
  className?: string;
};
export function VirtualList<T>({
  rowHeight,
  visibleCount,
  list,
  children,
  className,
}: VirtualListProps<T>) {
  const [scrollTop, onScroll] = useScroll();

  const viewportHeight = rowHeight * visibleCount;
  const totalHeight = rowHeight * list.length;
  const startIndex = Math.floor(scrollTop / rowHeight);

  return (
    <div
      style={{ height: viewportHeight + "px" }}
      className={clsx("overflow-auto", className)}
      onScroll={onScroll}
    >
      <ul
        style={{
          height: totalHeight + "px",
          willChange: "transform",
          transform: `translateY(${startIndex * rowHeight}px)`,
        }}
      >
        {children &&
          Array.from({ length: visibleCount + 1 }, (_, index) => (
            <li key={startIndex + index} style={{ height: rowHeight + "px" }}>
              {children?.(list[startIndex + index])}
            </li>
          ))}
      </ul>
    </div>
  );
}
