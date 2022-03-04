const { expect } = require("chai");
const { ethers, wafffle } = require("hardhat");

describe("Time Day 0 Basic Test", function () {
  let owner, addr1,addr2,addr3,addrAll;
  let time, provider;
  before(async ()=>{
    const Time = await ethers.getContractFactory("TimeNFT");
    time = await Time.deploy(ethers.utils.parseEther("1.0"));
    await time.deployed();
    provider = waffle.provider;
    [owner, addr1,addr2,addr3,...addrAll] = await ethers.getSigners();

  });
  it("Should make user claim", async function () {
    //console.log(time);
    await time.connect(addr1).claim(0,{value: ethers.utils.parseEther("1.0")});

    expect(await time.ownerOf(0)).to.equal(addr1.address);
  });
  
  it("Should understand if token is already claimed or not", async function(){
    await time.connect(addr2).claim(111,{value: ethers.utils.parseEther("1.0")});
    expect(await time.isOwned(111)).to.equal(true);
    expect(await time.isOwned(0)).to.equal(true);
    expect(await time.isOwned(11)).to.equal(false);
  });

  it("Should user not be able to withdraw before time", async function(){
    await time.connect(addr2).claim(1111,{value: ethers.utils.parseEther("1.0")});
    await expect(time.connect(addr2).withdrawNFT(1111)).to.be.revertedWith("Too early to receive funds");
  });
  
  it("Should user be able to withdraw after time completes", async function(){
    await provider.send("evm_increaseTime", [60*60*28]);
    //await time.connect(addr2).claim(1111,{value: ethers.utils.parseEther("1.0")});
    let contractsBeforeBalance = await provider.getBalance(time.address);
    
    await time.connect(addr2).withdrawNFT(1111);
    let contractsAfterBalance = await provider.getBalance(time.address);
    let difference = contractsBeforeBalance.sub(contractsAfterBalance);
    expect(difference.toString()).to.equal("1000000000000000000");
  });

  it("Transferred NFT's balance can't be withdrawn by old owner", async function(){
    // Third address mints nft
    await time.connect(addr3).claim(3,{value: ethers.utils.parseEther("1.0")});
    // Approves first to transfer NFT himself
    await time.connect(addr3).approve(addr1.address, 3);
    // Address 1 transfers NFT to himself
    await time.connect(addr1).transferFrom(addr3.address, addr1.address, 3);
    // Wait for 28 hours
    await provider.send("evm_increaseTime", [60*60*28]);
    // Try to claim from addr3
    await expect(time.connect(addr3).withdrawNFT(3)).to.be.revertedWith("You are not the owner of this NFT");
  });
});
