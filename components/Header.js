import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default () => {
	//using jsx custom styling passed as an object
	return (
		<Menu style={{ marginTop: "10px" }}>
			<Menu.Item>CrowdCoin</Menu.Item>

			<Menu.Menu position="right">
				<Menu.Item>Campaigns</Menu.Item>
				<Menu.Item>+</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};
