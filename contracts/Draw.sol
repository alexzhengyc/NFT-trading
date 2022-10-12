// SPDX-License-Identifier: GPL3.0
pragma solidity ^0.5.0;

contract Draw {
    address payable public manager;
    address payable public player;
    
    int16 public newCard;
    address payable[100] public owner;   // Picture owner
    uint16[] public collections;
    
    uint16 public count;        // the draw times 

    constructor() public {
        manager = msg.sender;
        count = 0;
        for(uint16 i = 0 ; i<100; i++){    // initial all the picture to manager
            owner[i] = manager;             
        }
    }
    function get_owner() public view returns(address payable[100] memory){
        return owner;
    }
    
    function get_random() public view returns(uint16){
        
        bytes memory r1 = abi.encodePacked(block.timestamp, block.difficulty, player, count);
        bytes32 r2 = keccak256(r1);
        uint256 r3 = uint256(r2);
        uint16 index = uint16(r3 % 100);
        
        return index;
    }
    
    function get_card(uint16 index) public returns (bool){
        
        bool state;
        if(owner[index] == manager){                // the card hasn's been drawed
            state = true;
            owner[index] = player;  
        }   
        else{
            state = false;
        }
        
        return state;
    }

    function play() public payable returns (int16) {
        require(msg.value == 1 ether);
        
        player = msg.sender;
        count = count + 1;   
        
        uint16 index = get_random();
        bool state = get_card(index);
        
        while(state == false && count <= 100){
            index = index > 0 ? index - 1 : 99;
            state = get_card(index);
        }    
        
        if(count <= 100){
            manager.transfer(1 ether);
            newCard = int16(index);
        }
        
        else{
            player.transfer(1 ether);
            newCard = 0;
            // warning: the cards have all been drawed
        }
    }

    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    function get_count() public view returns (uint16){
        return count;
    }


    
    function get_collections() public returns(uint16[] memory, int16){

        delete collections;
        int16 collection_num = 0;

        for(uint16 i=0; i < 100; i++){
            if(owner[i] == player){
                collections.push(i);
                collection_num = collection_num +1;
            }
        }

        return (collections, collection_num);
    }

}