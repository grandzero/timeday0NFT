const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Time Day 0 Basic Test", function () {
  let owner, addr1,addr2,addr3,addrAll;
  let time;
  before(async ()=>{

    const Time = await ethers.getContractFactory("TimeNFT");
    time = await Time.deploy(ethers.utils.parseEther("1.0"));
    await time.deployed();
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
  })
});
