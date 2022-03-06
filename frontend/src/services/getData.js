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
    return await contract.isOwned(id);
}

// async function changeNetwork(){
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const { chainId } = await provider.getNetwork()
//       console.log(chainId) // 80001 => Mumbai / 137 => Polygon
//       if(chainId !== 80001)
//       {window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [{
//             chainId: "0x13881", //0x89 => Matic Mainnet
//             rpcUrls: ["https://rpc-mumbai.matic.today/"], // https://rpc-mainnet.matic.network/ 
//             chainName: "Matic Testnet",
//             nativeCurrency: {
//                 name: "MATIC",
//                 symbol: "MATIC",
//                 decimals: 18
//             },
//             blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
//         }]
//     });}
// }