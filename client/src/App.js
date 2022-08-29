import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import work from "./contracts/work.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from 'reactjs-popup';
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  
  const [address, setaddress] = useState("");
  const [add2, setadd2] = useState("");
  const [add3, setadd3] = useState("");
  
  const [add4, setadd4] = useState("");
  const [token2, settoken2] = useState(0);
  const [tokens, settokens] = useState(0);
  const [mark1, setmarks1] = useState(0);
  const [mark2, setmarks2] = useState(0);
  const [mark3, setmarks3] = useState(0);
  const [caste,setcaste] = useState("");
  const [income, setincome] = useState(0);
  const [name,setname] = useState("");
  const [balance, setbalance] = useState(0);
  const [sender, setsender] = useState("");
  const [details, setdetails] = useState({
    name: "",
    address: "",
    caste: "",
    Tokens: 0, 
    ScholarshipAmount: 0,
    Marks: 0
  });


  // const add = () => {
  //   contract.methods.create(amount,name).send({from: account}, (error)=>{
  //     if(!error){
          
  //         setname("");
  //         setamount(0);
  //     }
  //   });
  // }

  const register = async () => {
    
    await contract.methods.register(name,address,caste,income,mark1,mark2,mark3).send({from: account}, (error)=>{
      if(!error){
             console.log("success");
      }
    });
  }

  const supply = async() => {
    await contract.methods.supply(add2,tokens).send({ from: account}, (error)=>{
      if(!error){
        setadd2("");
        settokens(0);
      }
    })
  }
  
  
  const transfer = () => {
    if(sender===address) return;

    contract.methods.transfer(sender,add3,token2).send({ from: account }, (error)=>{
      if(!error){
        setsender("");
        setadd3("");
        settoken2(0);
      }
    })
  }

  const detail = async () => {
      let l = [];
      l = await contract.methods.getdetails(add4).call();
      

      setdetails({
        name: l[0],
      ScholarshipAmount: l[1],
      Tokens: l[2], 
      Marks: l[3]
      });
  }

  
  const bal = async () => {
    let b = await contract.methods.getBalance(address).call();
    
    setbalance(b);
    
    console.log(balance);
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = work.networks[networkId];
    if(networkData){
      const abi = work.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    //await load(contract);
  }, [])

  return (
<div>
    <nav className="navbar navbar-light bg-dark px-4" >
            <span className="txtcol" > Jaypee Scholarship </span>
            
            <span className="txtcol"> Current Account : {account}</span>
        </nav>

    <div className="d-flex flex-row custom2">
      <div className="flex-col custom">
        <form className="formd">
          Enter Register Details
          <br></br>
          <span><input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="formt "placeholder="Enter Student Address" /></span>
          <br></br>
          <span><input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="formt" placeholder="Enter Name" /> </span>
          <br></br>
          <span><input type="text" value={caste} onChange={(e)=>setcaste(e.target.value)} className="formt"  placeholder="Enter Caste" />  </span>
          <br></br>
          
        </form>


        <form className="formd">
          Enter Income Details
          <br></br>
          <input type="number" value={income} onChange={(e)=>setincome(e.target.value)} className="formt form" placeholder="Enter Income" />
          <br></br>
        </form>

        <form className="formd">
          Enter Marks Details
          <br></br>
          <input type="number" value={mark1} onChange={(e)=>setmarks1(e.target.value)} className="formt form" placeholder="Enter Marks 1" /> 
          <br></br>
          <input type="number" value={mark2} onChange={(e)=>setmarks2(e.target.value)} className="formt form" placeholder="Enter Marks 2" />
          <br></br>
          <input type="number" value={mark3} onChange={(e)=>setmarks3(e.target.value)} className="formt form" placeholder="Enter Marks 3" />
          <br></br>
          <button onClick={register} className="btn btn-primary"> Submit </button>
        </form>


        <form className="formd" >
          Enter Token Supply Details
          <br></br>
          <input type="text" value={add2} onChange={(e)=>setadd2(e.target.value)} className="formt form" placeholder="Enter To Address" />
          <br></br>
          <input type="number" value={tokens} onChange={(e)=>settokens(e.target.value)} className="formt form" placeholder="Enter No Of Tokens" />
          <br></br>
          <button onClick={supply} className="btn btn-primary"> Submit </button>
        </form>

        </div>

        


        <div className="flex-col custom3">
        <form className="formd">
          Enter Token Transfer Details
          <br></br>
          <input type="text" value={sender} onChange={(e)=>setsender(e.target.value)} className="formt form" placeholder="Enter From Address" /> 
          
          <br></br>
          <input type="text" value={add3} onChange={(e)=>setadd3(e.target.value)} className="formt form" placeholder="Enter To Address" /> 
          <br></br>
          <input type="number" value={token2} onChange={(e)=>settoken2(e.target.value)} className="formt form" placeholder="Enter No Of Tokens" />
          <br></br>
          <button onClick={transfer} className="btn btn-primary"> Submit </button>
        </form>


        <form className="formd">
          Get Student Details
          <br></br>
          <input type="text" value={add4} onChange={(e)=>setadd4(e.target.value)} className="formt form" placeholder="Enter Student Address" />
          <br></br>
          <button type="button" className="btn btn-primary" onClick={detail}> Submit </button>
        </form>

        
        </div>
        
        <div className="flex-col custom4">
          <form className="formd">
            <table>
              <tr>
                <td className="custom5"> Name: {details.name} </td >
              </tr>
              <tr>
                <td className="custom5"> Scholarship Amount: {details.ScholarshipAmount} </td>
              </tr>
              <tr>
                <td className="custom5"> Token balance: {details.Tokens} </td>
              </tr>
              <tr>
                <td className="custom5"> Marks: {details.Marks} </td>
              </tr>
            </table>
          </form>
        </div>
    </div>
    </div>
  );
};

export default App;