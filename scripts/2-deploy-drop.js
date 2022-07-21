import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    //  ⬇ https://portal.thirdweb.com/pre-built-contracts/edition-drop
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // The collection's name, ex. CryptoPunks
      name: "Tender_Love_Care_DAO Membership",
      // A description for the collection.
      description: "A DAO for Tender Loving Care people. Let's be kind and do nice things",
      // The image that will be held on our NFT! The fun part :).
      image: readFileSync("scripts/assets/tlc.png"),
      // image: readFileSync("scripts/assets/tlc.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the contract.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // ⬇ https://github.com/ethers-io/ethers.js/blob/master/packages/constants/src.ts/addresses.ts#L1
      primary_sale_recipient: AddressZero,
      // Set this to your own wallet ⬆⬆  address if you want to charge for the drop.
      symbol: '❤TLC'
    });

    // this initialization returns the address of our contract
    // we use this to initialize the contract on the thirdweb sdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // with this, we can get the metadata of our contract
    const metadata = await editionDrop.metadata.get();

    console.log(
      '\x1b[32m%s\x1b[0m', "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    // console.log('\x1b[36m%s\x1b[0m','Check on EtherScan:' , `https://rinkeby.etherscan.io/tx/${editionDropAddress}`)
    console.log('\x1b[34m%s\x1b[0m',"✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m',"failed to deploy editionDrop contract", error);
  }
})();