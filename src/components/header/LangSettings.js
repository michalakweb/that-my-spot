import React from "react"
import settingsIcon from "../../images/settingsIcon.png"

const LangSettings = props => (
	<div
		id="lang_settings"
		onClick={() => {
			props.switchTutorialScreen()
		}}
	>
		<img src={settingsIcon} id="settings_icon" alt="settings icon" />
	</div>
)

export default LangSettings
