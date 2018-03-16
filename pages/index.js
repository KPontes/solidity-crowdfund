import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

// class based component
class CampaignIndex extends Component {
	//Class method required from Next instead of DidMount, for initilizing on server side
	// Next does not execute DidMount, instead executes InitialProps
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		//return the retrieved campaigns as properties (props) of the component, so we can refer as this.props on render()
		return { campaigns };
	}

	//async componentDidMount() { code cleaned }

	renderCampaigns() {
		// map will iterate through each campaign item
		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description: <a>View campaign</a>,
				fluid: true
			};
		});
		return <Card.Group items={items} />;
	}

	render() {
		//link refering css here is because Next does not support css config
		//Normally reference to link tags should be on the Head of the Html tag,
		//but with Next we do not have an easy access to our default Html document, as instead, Next generate one for us
		return (
			//everything inside the Layout tags will be passed to the Layout component as props.children
			<Layout>
				<div>
					<link
						rel="stylesheet"
						href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
					/>
					<h3>Open Campaigns</h3>
					<Button
						floated="right"
						content="Create Campaign"
						icon="add circle"
						primary
					/>
					{this.renderCampaigns()}
				</div>
			</Layout>
		);
	}
}

/*Next requires that every file in the pages directory must export a component*/
export default CampaignIndex;
