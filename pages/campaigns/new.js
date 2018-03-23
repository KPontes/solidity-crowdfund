import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
	state = {
		minimumContribution: "",
		errorMessage: "",
		loading: false //Loading is used to flag a spinner in the button
	};

	onSubmit = async event => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: "" });

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createCampaign(this.state.minimumContribution)
				.send({
					from: accounts[0],
					gas: 1000000
				}); //metaMask should have a featute to calculate the GAS, so should not need to specify, but didn't work
			Router.pushRoute("/"); //redirect to home after creating the campaign
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<h3>Create a Campaign</h3>
				{/* error property on the Form binds to the message so it is showed
				!! is a trick (not not) to return a boolean to the error property to be shown or not*/}
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Minimum Contribution</label>
						<Input
							label="wei"
							labelPosition="right"
							value={this.state.minimumContribution}
							onChange={event =>
								this.setState({ minimumContribution: event.target.value })
							}
						/>
					</Form.Field>
					{/* error here is just a property of Message to display in red*/}
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button loading={this.state.loading} primary>
						Create!
					</Button>
				</Form>
			</Layout>
		);
	}
}

export default CampaignNew;
