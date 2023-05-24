pragma solidity ^0.8.7;

contract KSAProject{

 struct user{
      string orgName;
      string email;
      string loc;
      address wallet;
      bool status;
      bool isOperated;
  }
  struct Application{
     string hashValue;
     bool GovernmentApproved;
     bool CoOrdinatorApproved;
     bool Inspection;
     bool Progress;
     string Comment;
     address wallet;
  }
  
    mapping(address => bool) public owners;

    constructor(address _addressOne,address _addressTwo){
        owners[_addressOne]=true;
        owners[_addressTwo]=true;
    }
    user[] public appUsers;
    Application[] public applicationInfo;

    modifier isOwner {
     require(owners[msg.sender],"not a owner");
     _;
    }
    function storeApplication(string memory _hash) public{
        applicationInfo.push(
            Application({
                hashValue:_hash,
                GovernmentApproved:false,
                CoOrdinatorApproved:false,
                Inspection:false,
                Progress:true,
                Comment:"",
                wallet:msg.sender
            })
        );
    }
    function registerUser(string memory _email,string memory _loc,string memory _orgName) public{
        appUsers.push(user({
            orgName:_orgName,
            email:_email,
            loc:_loc,
            wallet:msg.sender,
            status:false,
            isOperated:false
        }));
    }
    function approveUser(uint _index,bool _status) public{
        appUsers[_index].status=_status;
        appUsers[_index].isOperated=true;
    }
    function getUsers() external view returns(user[] memory){
        return appUsers;
    }
    function getApplicationInfo() external view returns(Application[] memory){
        return applicationInfo;
    }

      function setCoOrdinatorApproval ( uint256 _index, bool _approval ) public isOwner {
          applicationInfo[_index].CoOrdinatorApproved=_approval;
          applicationInfo[_index].Progress=false;
      }
      function setGovernmentApproval ( uint256 _index, bool _approval, string memory _comment ) public isOwner{
          applicationInfo[_index].GovernmentApproved=_approval;
          applicationInfo[_index].Comment=_comment;
      }
    function setInspection ( bool _inspection, uint256 _index ) public isOwner{
        applicationInfo[_index].Inspection=_inspection;
    }

     function VerifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }
    

}