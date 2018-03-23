import web3 from "./web3";
import Campaign from "./build/Campaign.json";

//returns an instance of a deployed contract at the address received by parameter
export default address => {
	return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
