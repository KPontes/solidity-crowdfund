import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0xeb0E37012bfc48ac332c57eEC9e4dE9cf1C0774a"
);

export default instance;
