pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }    

    function Campaign(uint minimum, address creator) public {
        //manager = msg.sender; //using the campaign factory this would get the factory address
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            //only need to initialize value types, not reference ones
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index]; //reference to the actual contract variable
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]); //negative of already approved
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }   
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index]; //reference to the actual contract variable
        
        require(!request.complete); //not approve already completed requests
        require(request.approvalCount > (approversCount / 2)); //minimum half have approved
        request.recipient.transfer(request.value); //send the money
        request.complete = true;

    }
    
}