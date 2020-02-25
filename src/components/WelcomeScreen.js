import React from "react"

const WelcomeScreen = props => (
  <div id="welcome_screen">
    <div id="welcome_logo">Logo</div>
    <div id="button_container">
      <button
        onClick={() => {
          props.switchWelcomeScreen()
        }}
      >
        Start
      </button>
    </div>
  </div>
)

export default WelcomeScreen
