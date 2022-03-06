const id_network = process.env.REACT_APP_NETWORK_ID;
const opcode_network = process.env.REACT_APP_NETWORK_OPCODE
const {Web3} = window;
let walletAddress = ''
const NETWORK = process.env.REACT_APP_NETWORK // MATIC in production
export const init = async ( {setWalletAddress, setWalletNetwork, setWalletState} ) => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts[0]) {
        setWalletState(true)
        setWalletState(true)
        walletAddress = accounts[0]
      } else {
        setWalletState(false)
      }
      window.location.reload();
    })

    window.ethereum.on('chainChanged', function (network) {
      if (network == opcode_network) {
        setWalletNetwork(NETWORK)
      } else {
        
        setWalletNetwork('no-'+NETWORK);
      }
    })

    window.ethereum.on('disconnect', function () {
      setWalletState(false)
      window.location.reload();
      
    })
  } else {
    setWalletNetwork("no-metamask")
    setWalletState(false)
  }
}

export const connectWallet = async ({setWalletAddress, setWalletNetwork, setWalletState}) => {
  await window.ethereum
    .request({
      method: 'eth_requestAccounts',
    })
    .then((accounts) => {
      if (accounts[0]) {
        let web3 = new Web3(window.ethereum)
        web3.eth.getChainId().then(async (network) => {
          if (network == id_network && walletAddress) {
            setWalletNetwork(NETWORK)
          } else {
            setWalletNetwork("no-"+NETWORK);
          }
        })

        setWalletAddress(accounts[0])
        setWalletState(true)
        walletAddress = accounts[0]
      } else {
        setWalletState(false)
      }
    })
    .catch((err) => {
      console.log(err)
      return
    })
}

export const switchChain = async () => {
  await window.ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: opcode_network }],
    })
    .catch((err) => {
      console.log(err)
      return
    })
}

export const checkConnection = async ( {setWalletAddress, setWalletNetwork, setWalletState} ) => {
  // Check if browser is running Metamask
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum)

    // Check if User is already connected by retrieving the accounts
    web3.eth.getAccounts().then(async (addr) => {
      if (addr[0]) {
        walletAddress = addr[0]
        setWalletAddress(addr[0])
        setWalletState(true)

      } else {
        setWalletState(false)
      }
    })

    web3.eth.getChainId().then(async (network) => {
      if (network == id_network && walletAddress) {
        setWalletNetwork(NETWORK);
      } else {
       setWalletNetwork("no-",NETWORK);
      }
    })
  }
}

// ///////////   NFT Contract  ///////////
// export const initContract = async () => {
//   const web3 = new Web3(window.ethereum)

//   nftContract = new web3.eth.Contract(
//     NFTcontractBuild,
//     process.env.VUE_APP_CONTRACT_ADR
 
//     )
// }

