import React from "react";
import { YoutubeIframeAPIProvider, Youtube, VirtualList } from "./components";

const list: number[] = [];

for (let id = 0; id < 10000; id++) {
  list.push(id);
}

function App() {
  return (
    <YoutubeIframeAPIProvider>
      <main>
        <Youtube />

        <VirtualList visibleCount={10} rowHeight={40} list={list}>
          {(item) => <div className="bg-blue-500 h-full">{item}</div>}
        </VirtualList>
      </main>
    </YoutubeIframeAPIProvider>
  );
}

export default App;
