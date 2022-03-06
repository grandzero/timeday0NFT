import {useState, useEffect, createContext} from 'react';
import {init, checkConnection} from "./services/wallet";
import abi from "./abi/TimeNFT";
const {Web3} = window;
const WalletContext = createContext(null);


export const WalletProvider = ({children}) => {
    const [walletAddress,setWalletAddress] = useState("");
    const [walletState,setWalletState] = useState(false);
    const [walletNetwork, setWalletNetwork] = useState(""); 
    const [contract, setContract] = useState("");
    useEffect(()=>{
        (async function(){
            await init({setWalletAddress, setWalletNetwork, setWalletState});
            await checkConnection({setWalletAddress, setWalletNetwork, setWalletState});

        })()
    })

    useEffect(()=>{
        (async function(){
            if(walletAddress.split("") !== ""){
                const web3 = new Web3(window.ethereum);
                
                let cont = new web3.eth.Contract(abi,process.env.REACT_APP_CONTRACT_ADDR);
                
                setContract(cont);
            }
        })()
    },[walletAddress])

    const values = {
        walletAddress,
        setWalletAddress,
        walletState,
        setWalletState,
        walletNetwork,
        setWalletNetwork,
        contract
    };

    return <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
}
export default WalletContext;
