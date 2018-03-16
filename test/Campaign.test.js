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

	it("Make sure the creator as the campaign manager", async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(accounts[0], manager);
	});

	it("Allow contributors and mark them as approvers", async () => {
		const manager = await campaign.methods.contribute().send({
			value: "200",
			from: accounts[1]
		});
		const isContributor = await campaign.methods.approvers(accounts[1]).call;
		assert(isContributor);
	});

	it("Requires a minimum contribution", async () => {
		try {
			await campaign.methods.contribute().send({
				value: "5",
				from: accounts[1]
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("Allows the manager to make a payment request", async () => {
		await campaign.methods.createRequest("Buy engine", 200, accounts[2]).send({
			gas: "1000000",
			from: accounts[0]
		});
		const request = await campaign.methods.requests(0).call();
		assert.equal("Buy engine", request.description);
	});

	it("Process end to end request", async () => {
		let oldBalance = await web3.eth.getBalance(accounts[1]);
		oldBalance = web3.utils.fromWei(oldBalance, "ether"); //returns a string
		oldBalance = parseFloat(oldBalance);

		await campaign.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei("10", "ether")
		});

		await campaign.methods
			.createRequest("Buy engine", web3.utils.toWei("5", "ether"), accounts[1])
			.send({
				gas: "1000000",
				from: accounts[0]
			});

		await campaign.methods.approveRequest(0).send({
			gas: "1000000",
			from: accounts[0]
		});

		await campaign.methods.finalizeRequest(0).send({
			gas: "1000000",
			from: accounts[0]
		});

		let newBalance = await web3.eth.getBalance(accounts[1]);
		newBalance = web3.utils.fromWei(newBalance, "ether"); //returns a string
		newBalance = parseFloat(newBalance);

		assert((newBalance = oldBalance + 5));
	});
});
