import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x893D52CBE48E6A4a4BB4157b64648364e38A7d96");

//  https://portal.thirdweb.com/typescript/sdk.editiondrop.claimconditions

(async () => {
  try {
    // We define our claim conditions, this is an array of objects because
    // we can have multiple phases starting at different times if we want to
    const claimConditions = [{
      startTime: new Date(),// start the presale now
      maxQuantity: 50_000,// limit how many mints for this presale
      price: 0, // presale price
      quantityLimitPerTransaction: 1, // Max NFTs people can claim in one transaction.
      // We set the wait between transactions to MaxUint256, which means
      // people are only allowed to claim once.
      waitInSeconds: MaxUint256,
    }]
    // ⬇ this willinteract with our deployed contract on-chain and adjust the conditions,
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log('\x1b[35m%s\x1b[0m',"✅ Successfully set claim condition!");
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m',"Failed to set claim condition", error);
  }
})();