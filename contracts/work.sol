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
    mapping(string => bool) public check; // string adress hai. map hai ya  nahi studnet resigetere ot not
    mapping(string => student) public students; //har student ke database kouske address se link... 
    mapping(string => uint) public balances; //address se token
    mapping(string => mark) public marks; // student marks

    function register(string memory _name, string memory _add, string memory _caste, uint _income, uint m1,uint m2,uint m3) public{
        
        //require(check[_add]==false,"Aleady Registered");
        // 
        
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

        student memory cur; // new memory create 
        cur.name = _name; // student name ... database me variable
        cur.add = _add;
        cur.caste = _caste;
        cur.scholaramount = am;
        cur.tokens = 0;
        cur.totalmarks = totalMarks;
        
        students[_add] = cur; //address sme mapp.. return curr
        balances[_add] = 0;// initial 0 tiken
        mark memory mcur = mark(m1,m2,m3,totalMarks); // marks database
        marks[_add] = mcur;
        id++;
        check[_add] = true; // true registered flase not

    }

      // admin adreess dalega token supply
    function supply(string memory _add,uint _tokens) public {
        student memory cur = students[_add]; // registered database se add krdega

        //require(_tokens + cur.tokens<= cur.scholaramount,"Scholarship Amount" );
       // require(totalTokens>= _tokens,"Not Enough Tokens");

        cur.tokens += _tokens;
        balances[_add] += _tokens; // balance add

        totalTokens -= _tokens; // token - from total

        students[_add] = cur; // update student // cur databse studnt

    }

// student to student ...add milne .. sender sender address
    function transfer(string memory _sender,string memory _add, uint _tokens) public {

       //require(balances[_sender]>=_tokens,"Not Enough Tokens");
       student memory cur = students[_add]; // whom to send
       //require(_tokens  + cur.tokens<= cur.scholaramount,"Scholarship Amount" );

        student memory cur2 = students[_sender]; // sender se delete

        cur2.tokens -= _tokens; //total reduce
        cur.tokens += _tokens;
        balances[_add] += _tokens;
        balances[_sender] -= _tokens;

        students[_add] = cur;
        students[_sender] = cur2;
    }

    // adress send databse return krdena

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