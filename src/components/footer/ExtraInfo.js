import React from "react"

const ExtraInfo = props => (
  <div id="extra_info">
    <button
      disabled={props.currentPhase !== 1}
      onClick={() => {
        props.drawCard()
      }}
    >
      Draw card
    </button>
  </div>
)

export default ExtraInfo
