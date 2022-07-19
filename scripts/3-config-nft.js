import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x416854ac3f4dC17377D252CebfAb89F55b75E9f8");


// setting up the actual NFT on ERC-1155 ➡ all our members will mint the same NFT.
(async () => {
  try {
    // https://portal.thirdweb.com/typescript/sdk.editiondrop.createbatch
    await editionDrop.createBatch([
      {
        name: "TLC Envelope",
        description: "This NFT will give you access to TenderLovingCareDAO!",
        image: readFileSync("scripts/assets/tlc.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed: UNable to create the new NFT", error);
  }
})();