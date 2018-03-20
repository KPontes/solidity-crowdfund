import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

export default props => {
	//props.children comes from the components calling Layout
	return (
		//link refering css here is because Next does not support css config
		//Head is the way to tell Next that link tags must be generated on the Head of the Html tag,

		<Container>
			<Head>
				<link
					rel="stylesheet"
					href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
				/>
			</Head>
			<Header />
			{props.children}
			<h3 align="right">Copyright Footer</h3>
		</Container>
	);
};
