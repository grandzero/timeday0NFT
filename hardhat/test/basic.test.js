const { expect } = require("chai");
const { ethers, wafffle } = require("hardhat");
const { Buffer } = require('buffer');
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

  it("Should transferred NFT's balance can't be withdrawn by old owner", async function(){
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

  it("Should be rarity common and rarity amount X for lower then 10", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(10,{value: ethers.utils.parseEther("9.0")});
    // Get token uri
    let uri = await time.tokenURI(10);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Common");
    expect(jsonObj.attributes[1].value).to.equal("X");

  })

  it("Should be rarity uncommon and rarity amount XX for greater then 10 and lower then 50", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(12,{value: ethers.utils.parseEther("49.0")});
    // Get token uri
    let uri = await time.tokenURI(12);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Uncommon");
    expect(jsonObj.attributes[1].value).to.equal("XX");

  })

  it("Should be rarity Rare and rarity amount XX for greater then 50 and lower then 100", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(13,{value: ethers.utils.parseEther("99.0")});
    // Get token uri
    let uri = await time.tokenURI(13);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Rare");
    expect(jsonObj.attributes[1].value).to.equal("XX");

  })

  it("Should be rarity Epic and rarity amount XXX for greater then 100 and lower then 1000", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(14,{value: ethers.utils.parseEther("999.0")});
    // Get token uri
    let uri = await time.tokenURI(14);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Epic");
    expect(jsonObj.attributes[1].value).to.equal("XXX");

  })

  it("Should be rarity Legendary and rarity amount XXXX for greater then 1000 and lower then 10000", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(15,{value: ethers.utils.parseEther("9999.0")});
    // Get token uri
    let uri = await time.tokenURI(15);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Legendary");
    expect(jsonObj.attributes[1].value).to.equal("XXXX");

  })

  it("Should be rarity Legendary and rarity amount XXXX for greater then 1000 and lower then 10000", async function(){
    // Claim token more then 10x
    await time.connect(addr3).claim(16,{value: ethers.utils.parseEther("10000.0")});
    // Get token uri
    let uri = await time.tokenURI(16);

    uri = uri.replace("data:application/json;base64,", "").replace("=","");
    let buff = Buffer.from(uri, 'base64');
    let text = buff.toString('ascii');
    let jsonObj = JSON.parse(text);

    expect(jsonObj.attributes[0].value).to.equal("Godlike");
    expect(jsonObj.attributes[1].value).to.equal("XXXXX");

  })
});
