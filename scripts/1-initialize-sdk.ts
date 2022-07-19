import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";
// import dotenv from "dotenv";
// dotenv.config();
import {} from "dotenv/config";
// Some quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 Private key not found.");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.log("🛑 Alchemy API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("🛑 Wallet Address not found.");
}

//  The JSON-RPC API is a popular method for interacting with Ethereum
// ⬇ https://docs.ethers.io/v5/api/providers/jsonrpc-provider/
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
  try {
    const address = await sdk.getSigner()?.getAddress();
    console.log('\x1b[32m%s\x1b[0m', "SDK initialized by address:", '\x1b[35m%s\x1b[0m', address)
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;