import { ethers } from "ethers";

export const checkIfWalletIsConnected = async (callback) => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return false;
      } else {
        console.log("We have the ethereum object", ethereum);
        
      }
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        callback(account);
        return true;
       
      } else {
        console.log("No authorized account found")
        return false;
      }
      
      
    } catch (error) {
      console.log("account not found", error);
    }
}

export const connect = async (callback) => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      callback(accounts[0]);
    
    } catch (error) {
      console.log("-----",error)
    }
  }

export async function getPageDetails(contract,page){
    let items = []
    for(let i = 0; i<20; ++i){
        let value
        try{
            value = await contract.ownerOf(page+i);
            items.push({address:value,token:page+i});
        }catch(e){
            console.log(e);
        }
    }
    return items;
}
export async function ownerOfFunction({contract, id}){
    return await contract.ownerOf(id);
}