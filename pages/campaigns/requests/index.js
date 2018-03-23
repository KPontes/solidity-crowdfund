import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/RequestRow";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";

class RequestIndex extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;
		const campaign = Campaign(address);

		const requestCount = await campaign.methods.getRequestsCount().call();
		const approversCount = await campaign.methods.approversCount().call();

		//At this point Solidity does not allow return call of Array of Structures.
		//The workaround is get requestCount and iterate retrieving each request.
		//Promisse.all will make the return be one shot at the end
		//the fill method creates the array slots from 0 to requestCount-1.
		const requests = await Promise.all(
			Array(parseInt(requestCount))
				.fill()
				.map((element, index) => {
					return campaign.methods.requests(index).call()
				})
		);
		
		return { address, requests, requestCount, approversCount };
	}

	renderRows() {
		//react likes to be passed a key when rendering a list of components
		return this.props.requests.map((request, index) => {
			return <RequestRow 
				key={index} 
				id={index}
				request={request} 
				address={this.props.address}
				approversCount={this.props.approversCount}
			/>;
		});
	}

	render() {

		//this is just to avoid having to be typing Table.Header, Table.Row, and so on
		const {Header, Row, HeaderCell, Body} = Table;
		return (
			<Layout>
				<h3>Requests</h3>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button primary> Add Request </Button>
					</a>
				</Link>

				<Table celled>
			    <Header>
			      <Row>
			        <HeaderCell>Id</HeaderCell>
			        <HeaderCell>Description</HeaderCell>
			        <HeaderCell>Amount</HeaderCell>
			        <HeaderCell>Recipient</HeaderCell>
			        <HeaderCell>Approval count</HeaderCell>
			        <HeaderCell>Approve</HeaderCell>
			        <HeaderCell>Finalize</HeaderCell>
			      </Row>
			    </Header>	
			    <Body>
			    	{this.renderRows()}
			    </Body>	
			  </Table>		

			</Layout>
		);
	}
}

export default RequestIndex;
