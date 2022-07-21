import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x893D52CBE48E6A4a4BB4157b64648364e38A7d96");


// setting up the actual NFT on ERC-1155 ➡ all our members will mint the same NFT.
(async () => {
  try {
    // https://portal.thirdweb.com/typescript/sdk.editiondrop.createbatch
    await editionDrop.createBatch([
      {
        name: "TLC Envelope",
        description: "This NFT will give you access to TenderLovingCareDAO!",
        // image: readFileSync("scripts/assets/tlc.png"),
        image: "https://gateway.ipfscdn.io/ipfs/QmNyyMKd5ePDy9vhyR1sczNwe6pw5n9TMUys5UJjpphCTo/0"
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed: UNable to create the new NFT", error);
  }
})();