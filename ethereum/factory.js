import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0xA1aD7f0a152a2eEaecC8212eE63d0fBC113F9965"
);

export default instance;
