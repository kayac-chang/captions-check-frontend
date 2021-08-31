import React, { useRef, useEffect } from "react";
import { Icon } from ".";
import clsx from "clsx";
import { listen, Vector } from "../utils";

type CaptionProps = {};
export function Caption() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let initial: Vector | undefined;

    const observer = listen(ref.current)
      .add("pointerdown", ({ x, y }) => (initial = { x, y }))
      .add("pointermove", (event) => {
        if (!initial) return;

        const diff = initial.x - event.x;

        console.log(Math.sign(diff), Math.abs(diff));
      })
      .add("pointerup", () => (initial = undefined));

    return () => void observer.clear();
  }, []);

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-center",
        "py-2 h-full",
        "bg-danger-light"
      )}
    >
      <header className="flex items-center justify-between text-sm text-secondary py-1 px-4">
        <span className="flex items-center gap-2">
          <span className="w-3">
            <Icon.Critical />
          </span>

          <span>Modified</span>
        </span>

        <span>41:37:00</span>
      </header>

      <p className="px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div
        className="absolute h-full w-full overflow-hidden flex justify-between pointer-events-auto"
        ref={ref}
      >
        <span
          className={clsx(
            "inline-grid place-content-center",
            "h-full w-1/3 rounded-r-lg",
            "text-white bg-danger",
            "-translate-x-full"
          )}
        >
          Failed!
        </span>

        <span
          className={clsx(
            "inline-grid place-content-center",
            "h-full w-1/3 rounded-l-lg",
            "text-white bg-success",
            "translate-x-full"
          )}
        >
          PASS!
        </span>
      </div>
    </div>
  );
}
