import React from "react";
import { YoutubeIframeAPIProvider, Youtube } from "./components";

function App() {
  return (
    <YoutubeIframeAPIProvider>
      <main>
        <Youtube />
      </main>
    </YoutubeIframeAPIProvider>
  );
}

export default App;
