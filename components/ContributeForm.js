import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
	state = {
		value: "",
		errorMessage: "",
		loading: false
	};

	onSubmit = async event => {
		event.preventDefault();

		const campaign = Campaign(this.props.address); // get the camapaign contract instance

		this.setState({ loading: true, errorMessage: "" });

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(this.state.value, "ether") //as users are being requested to enter value in ether
			});
			//redirect to this sema page, refreshing to show new values after contributing to the contract
			Router.replaceRoute(`/campaigns/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false, value: "" });
	};

	render() {
		return (
			//	error property on the Form binds to the message so it is showed
			//	!! is a trick (not not) to return a boolean to the error property to be shown or not
			<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
				<Form.Field>
					<label>Amount to contribute</label>
					<Input
						label="ether"
						labelPosition="right"
						value={this.state.value}
						onChange={event => this.setState({ value: event.target.value })}
					/>
				</Form.Field>

				{/* error here is just a property of Message to display in red*/}
				<Message error header="Oops!" content={this.state.errorMessage} />

				<Button primary loading={this.state.loading}>
					Contribute!
				</Button>
			</Form>
		);
	}
}

export default ContributeForm;
