import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
	//using jsx custom styling passed as an object
	//used Link instead of menu.item because they conflict sltylings
	return (
		<Menu style={{ marginTop: "10px" }}>
			<Link route="/">
				<a className="item"> CrowdFunding </a>
			</Link>

			<Menu.Menu position="right">
				<Link route="/">
					<a className="item"> Campaigns </a>
				</Link>
				<Link route="/campaigns/new">
					<a className="item"> + </a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};
