// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721OwnerCheck.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract TimeNFT is ERC721OwnerCheck,ReentrancyGuard, Ownable, Pausable {
    using Strings for uint256;
    uint256 private immutable salePrice;
    struct NFTDetails{
        uint256 lockedAmount;
        uint256 releaseDate;
    }
    mapping(uint256 => NFTDetails) private releaseDetails;
    /**
    * @dev This function helps getting first digit of time as svg
    * @param number uint8 first digit of number
    * @return string generated svg
    */
    function getFirstDigit(uint8 number) internal pure returns (string memory) {
        string[7] memory sticks = [
            "<path id='a1' d='M4,39l3,3h6l3-3c0,0-1-1-3-1h-6C5,38,4,39,4,39z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='a2' d='M3,40l3,3v8l-3,2c0,0-1-1-1-3v-7C2,41,3,40,3,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='a3' d='M17,40l-3,3v8l3,2c0,0,1-1,1-3v-7C18,41,17,40,17,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<polygon id='a4' points='7,52 13,52 16,54 13,56 7,56 4,54' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='a5' d='M3,55l3,2v8l-3,3c0,0-1-1-1-3v-7C2,56,3,55,3,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='a6' d='M17,55l-3,2v8l3,3c0,0,1-1,1-3v-7C18,56,17,55,17,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='a7' d='M4,69l3-3h6l3,3c0,0-1,1-3,1h-6C5,70,4,69,4,69z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>"
        ];
        string memory outputSvg;
        // First digit is the most left digits
        // And can't be anything else then 0,1,2
        outputSvg = getDigit(sticks, number);

        return outputSvg;
    }

    /**
    * @dev This function helps getting second digit of time as svg
    * @param number uint8 second digit of number
    * @return string generated svg
    */
    function getSecondDigit(uint8 number) internal pure returns (string memory) {
        string[7] memory sticks = [
            "<path id='b1' d='M22,39l3,3h6l3-3c0,0-1-1-3-1h-6C23,38,22,39,22,39z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='b2' d='M21,40l3,3v8l-3,2c0,0-1-1-1-3v-7C20,41,21,40,21,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='b3' d='M35,40l-3,3v8l3,2c0,0,1-1,1-3v-7C36,41,35,40,35,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<polygon id='b4' points='25,52 31,52 34,54 31,56 25,56 22,54' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='b5' d='M21,55l3,2v8l-3,3c0,0-1-1-1-3v-7C20,56,21,55,21,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='b6' d='M35,55l-3,2v8l3,3c0,0,1-1,1-3v-7C36,56,35,55,35,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='b7' d='M22,69l3-3h6l3,3c0,0-1,1-3,1h-6C23,70,22,69,22,69z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>"
        ];
        string memory outputSvg;
        // First digit is the most left digits
        // And can't be anything else then 0,1,2
        outputSvg = getDigit(sticks, number);

        return outputSvg;
    }

    /**
    * @dev This function helps getting third digit of time as svg
    * @param number uint8 third digit of number
    * @return string generated svg
    */
    function getThirdDigit(uint8 number) internal pure returns (string memory) {
        string[7] memory sticks = [
            "<path id='c1' d='M46,39l3,3h6l3-3c0,0-1-1-3-1h-6C47,38,46,39,46,39z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='c2' d='M45,40l3,3v8l-3,2c0,0-1-1-1-3v-7C44,41,45,40,45,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='c3' d='M59,40l-3,3v8l3,2c0,0,1-1,1-3v-7C60,41,59,40,59,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<polygon id='c4' points='49,52 55,52 58,54 55,56 49,56 46,54' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='c5' d='M45,55l3,2v8l-3,3c0,0-1-1-1-3v-7C44,56,45,55,45,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='c6' d='M59,55l-3,2v8l3,3c0,0,1-1,1-3v-7C60,56,59,55,59,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='c7' d='M46,69l3-3h6l3,3c0,0-1,1-3,1h-6C47,70,46,69,46,69z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>"
        ];
        string memory outputSvg;
        // First digit is the most left digits
        // And can't be anything else then 0,1,2
        outputSvg = getDigit(sticks, number);

        return outputSvg;
    }
    
    /**
    * @dev This function helps getting fourth digit of time as svg
    * @param number uint8 fourth digit of number
    * @return string generated svg
    */
    function getFourthDigit(uint8 number) internal pure returns (string memory) {
        string[7] memory sticks = [
            "<path id='d1' d='M64,39l3,3h6l3-3c0,0-1-1-3-1h-6C65,38,64,39,64,39z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='d2' d='M63,40l3,3v8l-3,2c0,0-1-1-1-3v-7C62,41,63,40,63,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='d3' d='M77,40l-3,3v8l3,2c0,0,1-1,1-3v-7C78,41,77,40,77,40z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<polygon id='d4' points='67,52 73,52 76,54 73,56 67,56 64,54' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='d5' d='M63,55l3,2v8l-3,3c0,0-1-1-1-3v-7C62,56,63,55,63,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='d6' d='M77,55l-3,2v8l3,3c0,0,1-1,1-3v-7C78,56,77,55,77,55z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>",
            "<path id='d7' d='M64,69l3-3h6l3,3c0,0-1,1-3,1h-6C65,70,64,69,64,69z' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/>"
        ];
        string memory outputSvg;
        // First digit is the most left digits
        // And can't be anything else then 0,1,2
        outputSvg = getDigit(sticks, number);

        return outputSvg;
    }

    /**
      [1, 1, 1, 0, 1, 1, 1], // 0
      [0, 0, 1, 0, 0, 1, 0], // 1
      [1, 0, 1, 1, 1, 0, 1], // 2
      [1, 0, 1, 1, 0, 1, 1], // 3 1,4
      [0, 1, 1, 1, 0, 1, 0], // 4 0,4,6
      [1, 1, 0, 1, 0, 1, 1], // 5 2,4
      [1, 1, 0, 1, 1, 1, 1], // 6 2
      [1, 0, 1, 0, 0, 1, 0], // 7 1,3,4,6
      [1, 1, 1, 1, 1, 1, 1], // 8
      [1, 1, 1, 1, 0, 1, 1]  // 9
     */
    /**
    * @dev This function displays digital numbers sticks according to number
    * @param number uint8 digit
    * @param sticks takes all sticks as svg string
    * Sticks : up,upright,upleft, middle, bottomleft, bottomright, bottom
    * @return string generated svg
    */
    function getDigit(string[7] memory sticks, uint8 number)
        private
        pure
        returns (string memory)
    {
        string memory outputSvg;
        if (number == 0) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[1],
                    sticks[2],
                    sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        } else if (number == 1) {
            outputSvg = string(abi.encodePacked(sticks[2], sticks[5]));
        } else if (number == 2) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[2],
                    sticks[3],
                    sticks[4],
                    sticks[6]
                )
            );
        } else if (number == 3) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    //sticks[1],
                    sticks[2],
                    sticks[3],
                    // sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        } else if (number == 4) {
            outputSvg = string(
                abi.encodePacked(
                    //sticks[0],
                    sticks[1],
                    sticks[2],
                    sticks[3],
                    //sticks[4],
                    sticks[5]
                    // sticks[6]
                )
            );
        } else if (number == 5) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[1],
                    //sticks[2],
                    sticks[3],
                    // sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        } else if (number == 6) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[1],
                    //sticks[2],
                    sticks[3],
                    sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        } else if (number == 7) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    //sticks[1],
                    sticks[2],
                    // sticks[3],
                    // sticks[4],
                    sticks[5]
                    //sticks[6]
                )
            );
        } else if (number == 8) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[1],
                    sticks[2],
                    sticks[3],
                    sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        } else if (number == 9) {
            outputSvg = string(
                abi.encodePacked(
                    sticks[0],
                    sticks[1],
                    sticks[2],
                    sticks[3],
                    // sticks[4],
                    sticks[5],
                    sticks[6]
                )
            );
        }

        return outputSvg;
    }

    /**
    * @dev This function takes token id and returns digits of given number
    * @param value uint256 tokenId
    * @return uint8[4] all digits min : [0,0,0,0] max: [2,3,5,9]
    */
    function getValuesAsArray(uint256 value)
        internal
        pure
        returns (uint8[4] memory)
    {
        uint8 hrs;
        uint8 min;
        uint8[4] memory vals;

        hrs = uint8(value / 60); 
        if (hrs < 10) {
            vals[0] = 0;
            vals[1] = hrs;
        } else {
            vals[0] = hrs / 10;
            vals[1] = hrs % 10;
        }

        min = uint8(value % 60);
        if (min < 10) {
            vals[2] = 0;
            vals[3] = min;
        } else {
            vals[2] = min / 10;
            vals[3] = min % 10;
        }

        return vals;
    }

    /**
    * @dev This function returns total generated svg metadata
    * @param number uint256 tokenId
    * @return string conctinated string result
    */
    function getSvgForValue(uint256 number) internal pure returns (string memory) {
        uint8[4] memory digits;
        digits = getValuesAsArray(number);

        string[4] memory svgValuesForEachDigit = [
            getFirstDigit(digits[0]),
            getSecondDigit(digits[1]),
            getThirdDigit(digits[2]),
            getFourthDigit(digits[3])
        ];

        string memory svgOutput = string(
            abi.encodePacked(
                "<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg' xmlns:bx='https://boxy-svg.com'><g stroke='#ffffff' fill='#fffff' transform='matrix(4.837082, 0, 0, 5.310972, 59.219467, -45.47715)' ><g id='minutes'><g>",
                svgValuesForEachDigit[3],
                "</g><g>",
                svgValuesForEachDigit[2],
                " </g></g><g id='hours' ><g>",
                svgValuesForEachDigit[1],
                "</g><g>",
                svgValuesForEachDigit[0],
                " </g></g><g id='dots'><g><circle cx='40' cy='50' r='2' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/> <circle cx='40' cy='58' r='2' style='paint-order: stroke; stroke: rgb(0, 0, 0);'/></g></g></g><text style='fill: rgb(51, 51, 51); font-family: Impact; font-size: 32.2px; white-space: pre;' x='419.491' y='491.153'>DAY 0</text></svg>"
            )
        );

        return svgOutput;
    }

    /**
    * @dev Base64 version of metadata
    * @param tokenId token id
    * @return string onchain metadata
    */
    function tokenURI(uint256 tokenId) override public pure returns (string memory) {
        string memory rarity="rare";
        string memory rarityAmount = "X";
        if(releaseDetails[tokenId].lockedAmount < 10 ether){
            rarity = "common";
            rarityAmount = "X";
        }else if (releaseDetails[tokenId].lockedAmount < 50 ether){
            rarity = "uncommon";
            rarityAmount = "XX";
        }else if (releaseDetails[tokenId].lockedAmount < 100 ether){
            rarity = "rare";
            rarityAmount = "XX";
        }else if (releaseDetails[tokenId].lockedAmount < 1000 ether){
            rarity = "epic";
            rarityAmount = "XXX";
        }else if (releaseDetails[tokenId].lockedAmount < 10000 ether){
            rarity = "legendary";
            rarityAmount = "XXXX";
        }
        string memory output = getSvgForValue(tokenId);
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Time ',tokenId.toString(),'"','"description": "The most valuable thing in the entire world", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '", attributes:[{"trait_type":"Rarity","Value":"',rarity,'"},{"trait_type":"Rarity Amount","Value":"',rarityAmount,'"}]}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

   
    /**
    * @dev Minting function
    * @param tokenId token id
    */
    function claim(uint256 tokenId) public payable nonReentrant {
        require(tokenId >= 0 && tokenId < 1440, "Token ID invalid");
        require(msg.value >= salePrice, "Not enough fund");
        _safeMint(_msgSender(), tokenId);
        uint256 ethersVal = (msg.value / 10**18) * 1 days;
        releaseDetails[tokenId] = NFTDetails(msg.value,ethersVal);
    }

        function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
    * @dev NFT holders can withdraw all their fund using this function
    * @return bool if user successfullt withdraw
    */
    function withdrawNFT() external payable returns(bool){
        require(releaseDetails[msg.sender].lockedAmount > 0 && releaseDetails[msg.sender].releaseDate > 0, "Invalid user");
        require(block.timestamp > releaseDetails[msg.sender].releaseDate, "Too early to receive funds");
        payable(msg.sender).transfer(releaseDetails[msg.sender].releaseDate);
        return true;
    }

  

    constructor(uint256 _price) ERC721OwnerCheck("Day ZERO", "TIME") Ownable() {
        salePrice = _price;
    }
}
