// Setup treasury  transfer 80% of all our token to the voting contract. Once our token is moved to our voting contract, the voting contract itself will have access to the supply.
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x9393fb107aA2BD1BAe191E82422BC2Fc519fB728");

// This is our ERC-20 contract.
const token = sdk.getToken("0xdd899bC1C811CDB913D94c091b8F56339Fd69afa");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      '\x1b[32m%s\x1b[0m',"Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      '\x1b[31m%s\x1b[0m',"failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 80% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent80 = Number(ownedAmount) / 100 * 80;

    // Transfer 80% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent80
    ); 

    console.log("✅ Successfully transferred " + percent80 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();