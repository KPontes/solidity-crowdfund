import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

export default props => {
	//props.children comes from the components calling Layout
	return (
		<Container>
			<Header />
			{props.children}
			<h3 align="right">Copyright Footer</h3>
		</Container>
	);
};
