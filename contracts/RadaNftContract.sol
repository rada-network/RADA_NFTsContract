// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract RadaNftContract is
    ERC721,
    AccessControlEnumerable,
    ERC721Enumerable,
    ERC721Burnable,
    Ownable
{
    mapping(address => bool) public approvalWhitelists;

    struct NFT_INFO {
        bool locked; // Cannot transfer
        bool used; // Use for any purpuse
        bool isBox; // Is Box
        uint16 typeNft; // type of NFT
    }

    mapping(uint256 => NFT_INFO) public items;

    string private _baseTokenURI;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("RADA NFT", "RFT") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function safeMint(address _to, uint256 _tokenId) public virtual {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Must have minter role to mint"
        );
        require(!_exists(_tokenId), "Must have unique tokenId");
        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        _safeMint(_to, _tokenId);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool)
    {
        if (approvalWhitelists[_operator] == true) {
            return true;
        }

        return super.isApprovedForAll(_owner, _operator);
    }

    /**
     * @dev Allow operation to reduce gas fee.
     */
    function addApprovalWhitelist(address _addr) public onlyOwner {
        require(approvalWhitelists[_addr] == false, "Invalid _addr address");

        approvalWhitelists[_addr] = true;
    }

    /**
     * @dev Remove operation from approval list.
     */
    function removeApprovalWhitelist(address _addr) public onlyOwner {
        approvalWhitelists[_addr] = false;
    }

    /**
     * @dev Add factory to mint item
     */
    function setMintFactory(address _factory) public onlyOwner {
        _setupRole(MINTER_ROLE, _factory);
    }

    /**
     * @dev Remove factory
     */
    function removeMintFactory(address _factory) public onlyOwner {
        revokeRole(MINTER_ROLE, _factory);
    }

    /**
     * @dev Lock token
     */
    function handleLock(uint256 _tokenId, bool _locked) external {
        require(
            approvalWhitelists[_msgSender()],
            "Must be valid approval whitelist"
        );
        require(_exists(_tokenId), "Must be valid tokenId");
        require(!items[_tokenId].locked != _locked, "Already set");
        items[_tokenId].locked = _locked;
    }

    /**
     * @dev Set type NFT
     */
    function setType(uint256 _tokenId, uint16 _type) external {
        require(
            approvalWhitelists[_msgSender()],
            "Must be valid approval whitelist"
        );
        require(_exists(_tokenId), "Must be valid tokenId");
        require(items[_tokenId].typeNft == 0, "Cannot set type again");

        items[_tokenId].typeNft = _type;
    }

    /**
     * @dev Set is box NFT
     */
    function setBox(uint256 _tokenId, bool _isBox) external {
        require(
            approvalWhitelists[_msgSender()],
            "Must be valid approval whitelist"
        );
        require(_exists(_tokenId), "Must be valid tokenId");
        items[_tokenId].isBox = _isBox;
    }

    /**
     * @dev Use token
     */
    function handleUse(uint256 _tokenId, bool _used) external {
        require(
            approvalWhitelists[_msgSender()],
            "Must be valid approval whitelist"
        );
        require(_exists(_tokenId), "Must be valid tokenId");
        require(items[_tokenId].used != _used, "Already set");
        items[_tokenId].used = _used;
    }

    /**
     * @dev Get lock status
     */
    function isLocked(uint256 _tokenId) public view returns (bool) {
        return items[_tokenId].locked;
    }

    /**
     * @dev Get use status
     */
    function isUsed(uint256 _tokenId) public view returns (bool) {
        return items[_tokenId].used;
    }

    /**
     * @dev Get use status
     */
    function isBox(uint256 _tokenId) public view returns (bool) {
        return items[_tokenId].isBox;
    }

    /**
     * @dev Set token URI
     */
    function updateBaseURI(string calldata baseTokenURI) public onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    /**
     * @dev See {IERC165-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        require(!items[_tokenId].locked, "Can not transfer locked token");
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }
}
