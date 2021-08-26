import React from "react";
import {
  Icon,
  YoutubeIframeAPIProvider,
  Youtube,
  VirtualList,
} from "./components";

const list: number[] = [];

for (let id = 0; id < 10000; id++) {
  list.push(id);
}

function Caption() {
  return (
    <div>
      <header className="flex items-center justify-between text-sm text-secondary">
        <span className="flex items-center gap-2">
          <span className="w-4">
            <Icon.Critical />
          </span>

          <span>Modified</span>
        </span>

        <span className="">41:37:00</span>
      </header>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
    </div>
  );
}

function App() {
  return (
    <YoutubeIframeAPIProvider>
      <main>
        <Youtube />

        <VirtualList
          visibleCount={5}
          rowHeight={80}
          list={list}
          className="p-4"
        >
          {(item) => <Caption />}
        </VirtualList>
      </main>
    </YoutubeIframeAPIProvider>
  );
}

export default App;
