import React, {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: Function;
  }
}
async function loadScript(src: string): Promise<void> {
  const tag = document.createElement("script");
  tag.src = src;
  document.body.append(tag);

  return new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      tag.remove();

      resolve();
    };
  });
}

const StatusContext = createContext<boolean | undefined>(undefined);

type Props = {
  children?: ReactNode;
};
export function YoutubeIframeAPIProvider({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadScript("https://www.youtube.com/iframe_api").then(() => setReady(true));
  }, [setReady]);

  return (
    <StatusContext.Provider value={ready}>{children}</StatusContext.Provider>
  );
}

export function Youtube() {
  const ready = useContext(StatusContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !ref.current) return;

    new YT.Player(ref.current, {
      videoId: "M7lc1UVf-VE",
      width: 0,
      height: 0,
    });
  }, [ready]);

  return <div className="w-full" style={{ aspectRatio: "16 / 9" }} ref={ref} />;
}
