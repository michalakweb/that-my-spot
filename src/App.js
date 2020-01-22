import React from "react";
import "./App.css";

function App() {
  return (
    <div id="flex-container">
      <div id="header">
        <div id="logo">Logo</div>
        <div id="game_info">info</div>
        <div id="lang_settings">Lang Settings</div>
      </div>

      <div id="body">
        <div id="item_container">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
        </div>

        <div id="line_container">
          <div className="line_spot">line spot</div>
          <div className="line_spot">line spot</div>
          <div className="line_spot">line spot</div>
          <div className="line_spot">line spot</div>
        </div>
      </div>

      <div id="footer">Footer</div>
    </div>
  );
}

export default App;
