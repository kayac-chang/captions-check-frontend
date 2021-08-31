import React from "react";
import {
  Caption,
  YoutubeIframeAPIProvider,
  Youtube,
  VirtualList,
} from "./components";

const list: number[] = [];

for (let id = 0; id < 10000; id++) {
  list.push(id);
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
          className="py-4 flex flex-col gap-1"
        >
          {(item) => <Caption />}
        </VirtualList>
      </main>
    </YoutubeIframeAPIProvider>
  );
}

export default App;
