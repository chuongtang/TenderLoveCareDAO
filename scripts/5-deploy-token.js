import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // Deploy a standard ERC-20 contract.➡ https://portal.thirdweb.com/typescript/sdk.contractdeployer.deploytoken
    const tokenAddress = await sdk.deployer.deployToken({
      name: "TlcDAO Governance Token",
      symbol: "💚TLC",
      // This will be in case we want to sell our token,
      // because we don't, we set it to AddressZero again.
      primary_sale_recipient: AddressZero,
    });
    console.log(
      '\x1b[33m%s\x1b[0m',"✅ Successfully deployed token module, address:",
      tokenAddress,
    );
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m',"failed to deploy token module", error);
  }
})();