import {useState, useEffect, createContext} from 'react';
import {init, checkConnection} from "./services/wallet";


const WalletContext = createContext(null);


export const WalletProvider = ({children}) => {
    const [walletAddress,setWalletAddress] = useState("");
    const [walletState,setWalletState] = useState(false);
    const [walletNetwork, setWalletNetwork] = useState(""); 
    
    useEffect(()=>{
        (async function(){
            await init({setWalletAddress, setWalletNetwork, setWalletState});
            await checkConnection({setWalletAddress, setWalletNetwork, setWalletState})
        })()
    })

    const values = {
        walletAddress,
        setWalletAddress,
        walletState,
        setWalletState,
        walletNetwork,
        setWalletNetwork
    };

    return <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
}
export default WalletContext;
