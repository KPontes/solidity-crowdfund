const assert = require("assert");
const ganache = require("ganache-cli"); //local test network
const Web3 = require("web3"); //capitalized as it is a constructor used to create instances

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	//get a list of all accounts
	accounts = await web3.eth.getAccounts();
	//use one of those accounts to deploy the contract
	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: 1000000 });
	factory.setProvider(provider);

	await factory.methods
		.createCampaign("100")
		.send({ from: accounts[0], gas: 1000000 });

	// equivalent to assign the first position [0] from the returning array, to the variable campaignAddress
	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
	// get the campaign already deployed by the factory in the campaignAddress
	campaign = await new web3.eth.Contract(
		JSON.parse(compiledCampaign.interface),
		campaignAddress
	);
});

describe("Campaigns contract", () => {
	it("Deploy a contract", () => {
		//console.log(inbox);
		assert.ok(factory.options.address); //if contract successfully deployed, its address will exist
		assert.ok(campaign.options.address);
	});
});
