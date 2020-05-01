import React from "react"
import logo from "../../images/logo.png"

const Logo = (props) => (
	<div id="logo" className={!props.showWelcomeScreen ? "zoomInLogo" : ""}>
		<img src={logo} alt="logo" />
	</div>
)

export default Logo
