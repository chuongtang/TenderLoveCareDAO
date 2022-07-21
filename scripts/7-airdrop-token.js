import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop("0x893D52CBE48E6A4a4BB4157b64648364e38A7d96");

// This is the address to our ERC-20 token contract.
const token = sdk.getToken("0xdd899bC1C811CDB913D94c091b8F56339Fd69afa");

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, 
    // which has a tokenId of 0.
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        '\x1b[35m%s\x1b[0m',"No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log('\x1b[36m%s\x1b[0m',"✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    // https://portal.thirdweb.com/typescript/sdk.erc20.transferbatch
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m',"Failed to airdrop tokens", err);
  }
})();