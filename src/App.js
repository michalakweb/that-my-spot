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
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
          <div className="line_spot">
            <div className="line_card">line_card</div>
            <div className="line_spot_div"></div>
          </div>
        </div>
      </div>

      <div id="footer">
        <div className="card_container"></div>
      </div>
    </div>
  );
}

export default App;
