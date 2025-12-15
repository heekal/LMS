// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

    constructor() ERC721("LmsCertificate", "LMCRT") Ownable(msg.sender) {
        _nextTokenId = 1;
    }

    function mintCertificate(address to, string memory tokenURI)
        external
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

}
