import React, { ReactNode, CSSProperties } from "react";
import { Icon } from "..";
import { Gesture } from "./Gesture";
import clsx from "clsx";
import { css, clamp, calc } from "../../utils";

type FlagProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};
function Flag({ children, className, style }: FlagProps) {
  return (
    <div
      className={clsx(
        "inline-grid place-content-center",
        "h-full w-1/3 ",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between text-sm text-secondary py-1 px-4">
      <span className="flex items-center gap-2">
        <span className="w-3">
          <Icon.Critical />
        </span>

        <span>Modified</span>
      </span>

      <span>41:37:00</span>
    </header>
  );
}

type CaptionProps = {};
export function Caption() {
  return (
    <div
      className={clsx(
        "relative flex flex-col justify-center",
        "py-2 h-full",
        "bg-danger-light"
      )}
    >
      <Header />

      <p className="px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <Gesture className="absolute h-full w-full overflow-hidden flex justify-between pointer-events-auto">
        {({ direction, movement }) => (
          <>
            <Flag
              className="transform bg-danger rounded-r-lg"
              style={css({
                "--tw-translate-x": clamp({
                  min: "-100%",
                  value: calc(`-100% + ${-direction * movement}px`),
                  max: "0px",
                }),
              })}
            >
              Failed!
            </Flag>

            <Flag
              className="bg-success rounded-l-lg transform"
              style={css({
                "--tw-translate-x": clamp({
                  min: "0px",
                  value: calc(`100% + ${-direction * movement}px`),
                  max: "100%",
                }),
              })}
            >
              PASS!
            </Flag>
          </>
        )}
      </Gesture>
    </div>
  );
}
