pragma solidity ^0.8.0;

contract work {

    uint id;
    uint totalTokens;
    constructor(){
        id = 1;
        totalTokens = 10000000000000000;
    }

    struct student{
        string name;
        string add;
        string caste;
        uint tokens;
        uint scholaramount;
        uint totalmarks;
    }
    
    struct mark{
        uint sub1;
        uint sub2;
        uint sub3;
        uint total;
    }
    mapping(string => bool) public check;
    mapping(string => student) public students;
    mapping(string => uint) public balances;
    mapping(string => mark) public marks;

    function register(string memory _name, string memory _add, string memory _caste, uint _income, uint m1,uint m2,uint m3) public{
        
        //require(check[_add]==false,"Aleady Registered");
        
        uint am = 0;
        uint totalMarks = m1+m2+m3;

        if (totalMarks > 240 && _income < 10000)
        { am = 80000; 
            
        } 
        else if (totalMarks > 150 && totalMarks <=240 && _income < 10000){
            am = 50000;
        }
        else {
            am = 10000;
        }

        student memory cur;
        cur.name = _name;
        cur.add = _add;
        cur.caste = _caste;
        cur.scholaramount = am;
        cur.tokens = 0;
        cur.totalmarks = totalMarks;
        
        students[_add] = cur;
        balances[_add] = 0;
        mark memory mcur = mark(m1,m2,m3,totalMarks);
        marks[_add] = mcur;
        id++;
        check[_add] = true;

    }


    function supply(string memory _add,uint _tokens) public {
        student memory cur = students[_add];

        //require(_tokens + cur.tokens<= cur.scholaramount,"Scholarship Amount" );
       // require(totalTokens>= _tokens,"Not Enough Tokens");

        cur.tokens += _tokens;
        balances[_add] += _tokens;

        totalTokens -= _tokens;

        students[_add] = cur;

    }

    function transfer(string memory _sender,string memory _add, uint _tokens) public {

       //require(balances[_sender]>=_tokens,"Not Enough Tokens");
       student memory cur = students[_add];
       //require(_tokens  + cur.tokens<= cur.scholaramount,"Scholarship Amount" );

        student memory cur2 = students[_sender];

        cur2.tokens -= _tokens;
        cur.tokens += _tokens;
        balances[_add] += _tokens;
        balances[_sender] -= _tokens;

        students[_add] = cur;
        students[_sender] = cur2;
    }

    function getdetails(string memory _add) public view returns (student memory){
       // require(check[_add]==true,"Not registered");

        student memory cur = students[_add];

        return cur;
    }

    function getBalance(string memory _add) public view returns(uint){
        // require(check[_add]==true,"Not registered");

         uint bal = balances[_add];
         return bal;
    }

}