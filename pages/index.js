import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

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
				description: (
					<Link route={`/campaigns/${address}`}>
						<a>View campaign</a>
					</Link>
				),
				fluid: true
			};
		});
		return <Card.Group items={items} />;
	}

	render() {
		return (
			//everything inside the Layout tags will be passed to the Layout component as props.children
			<Layout>
				<div>
					<h3>Open Campaigns</h3>
					<Link route="/campaigns/new">
						<a>
							<Button
								floated="right"
								content="Create Campaign"
								icon="add circle"
								primary
							/>
						</a>
					</Link>

					{this.renderCampaigns()}
				</div>
			</Layout>
		);
	}
}

/*Next requires that every file in the pages directory must export a component*/
export default CampaignIndex;
