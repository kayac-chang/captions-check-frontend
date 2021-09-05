import React, { ReactNode, CSSProperties, useState } from "react";
import { Icon } from "..";
import { Direction, Gesture } from "./Gesture";
import clsx from "clsx";
import { css, clamp, calc } from "../../utils";

enum CaptionState {
  None,
  Accept,
  Reject,
}

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
        "h-full w-1/3",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

type HeaderProps = {
  state: CaptionState;
};
function Header({ state }: HeaderProps) {
  return (
    <header className="flex items-center justify-between text-xs text-secondary py-1 px-4">
      <span className="flex items-center gap-2">
        <span
          className={clsx(
            "w-3",
            state === CaptionState.Accept && "text-success",
            state === CaptionState.Reject && "text-danger"
          )}
        >
          {state === CaptionState.None && <Icon.Unknown />}
          {state === CaptionState.Accept && <Icon.Success />}
          {state === CaptionState.Reject && <Icon.Reject />}
        </span>

        <span className="font-bold">
          {state === CaptionState.None && "Unknown"}
          {state === CaptionState.Accept && "Done"}
          {state === CaptionState.Reject && "Reject"}
        </span>
      </span>

      <span className="space-x-1 flex items-center">
        <span>801</span>

        <span className="w-1">
          <Icon.Ellipse />
        </span>

        <span>01:05:19,615</span>
        <span>{"-->"}</span>
        <span>01:05:25,759</span>
      </span>
    </header>
  );
}

type CaptionProps = {};
export function Caption() {
  const [width, setWidth] = useState(0);
  const [state, setState] = useState(CaptionState.None);

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-center",
        "py-2 h-full shadow",
        state === CaptionState.Reject && "bg-danger-light",
        state === CaptionState.Accept && "bg-success-light"
      )}
      ref={(ref) => {
        ref && setWidth(ref.clientWidth);
      }}
    >
      <Header state={state} />

      <p className="px-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <Gesture
        className={clsx(
          "absolute overflow-hidden pointer-events-auto",
          "h-full w-full text-white text-lg font-bold",
          "flex justify-between"
        )}
        onPointerUp={(state) => {
          const gate = (width / 3) * 0.75;
          if (state.movement < gate) return;

          if (state.direction === Direction.Left) {
            return setState(CaptionState.Accept);
          }

          if (state.direction === Direction.Right) {
            return setState(CaptionState.Reject);
          }

          return setState(CaptionState.None);
        }}
      >
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
