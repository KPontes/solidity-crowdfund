import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class campaignShow extends Component {
	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);
		const summary = await campaign.methods.getSummary().call();
		//console.log(summary);
		return {
			address: props.query.address,
			minimumContribution: summary[0],
			balance: summary[1],
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]
		};
	}

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.props;

		const items = [
			{
				header: manager,
				description:
					"Manager created this campaign and can create requests to withdraw money",
				meta: "Address of manager",
				style: { overflowWrap: "break-word" }
			},
			{
				header: minimumContribution,
				description: "This is the minimum amount to become an approver",
				meta: "Minimum Contribution (in wei)"
			},
			{
				header: requestsCount,
				description:
					"A request tries to withdraw money from the contract after being approved by approvers",
				meta: "Number of requests"
			},
			{
				header: approversCount,
				description: "People who have already donated to this campaign",
				meta: "Number of approvers"
			},
			{
				header: web3.utils.fromWei(balance, "ether"),
				description: "How much money remaining in campaign to be spent",
				meta: "Campaign balance (ether)"
			}
		];
		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h3> Campaign show </h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>{this.renderCards()}</Grid.Column>
						<Grid.Column width={6}>
							<ContributeForm address={this.props.address} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link route={`/campaigns/${this.props.address}/requests`}>
								<a>
									<Button primary> View requests </Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default campaignShow;
