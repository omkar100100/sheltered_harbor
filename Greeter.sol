pragma solidity ^0.4.0;

contract Greeter {
    string greeting;

    function greeter(string _greeeting) public {
        greeting=_greeeting;
    }

    function setGreeting(string _greeeting) public {
        greeting=_greeeting;
    }

    function greet() constant returns (string) {
        return greeting;
    }


}