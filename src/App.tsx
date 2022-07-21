import { useAddress, useDisconnect, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import AppLogo from '../src/assets/DAOlogo3.svg'

const App: React.FC = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const [message, setMessage] = useState<string>('');
  const deployedContract = "0x893D52CBE48E6A4a4BB4157b64648364e38A7d96"

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(deployedContract);
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  useEffect(() => {

    const checkBalance = async (): Promise<void> => {
      try {
        //  query the smart contract to check if the user has our NFT.
        const balance = await editionDrop?.balanceOf(address as string, 0);

        // "0" is the tokenId ⬇ of our membership NFT
        if (balance?.gt(0)) {
          setHasClaimedNFT(true);
          console.log('\x1b[35m%s\x1b[0m', "🌟 this user has a membership NFT!");
          setMessage('You are an NFT holder for TlcDAO ❤')
        } else {
          setHasClaimedNFT(false);
          setMessage('⚠ You do NOT have a membership NFT')
          console.log('\x1b[31m%s\x1b[0m', "this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    address ? checkBalance() : setMessage("Metamask Wallet is NOT connected to this app");
  }, [address, editionDrop]);

  const mintNft = async (): Promise<void> => {
    setIsClaiming(true);
    try {
      setMessage(`Minting your 💚TLC NFT...`)
      await editionDrop?.claim(0, 1);
      console.log('\x1b[32m%s\x1b[0m', `🌊 Successfully Minted!`);
      setHasClaimedNFT(true);
      setMessage(`You are a 💚TLC NFT holder now 🎉`)
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
      setMessage('❌ Error when minting NFT')
    } finally {
      setIsClaiming(false);
    }
  };


  return (
    <div className="p-3">
      <nav className="flex items-center justify-between p-4 mx-auto">
        <a
          className="inline-flex items-center justify-center h-10 rounded-lg"
          href="/"
        >
          <img src={AppLogo} className="p-6 h-25" alt="app logo" /> <span className="text-shadow-lg text-stroke-md text-stroke-gray-500">Tender-Loving-Care DAO</span>
        </a>
        <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          {address ? (
            <>
              <strong className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-xs font-medium m-4">
                <span className="animate-ping w-2.5 h-2.5 bg-green-600/75 rounded-full absolute -top-1 -left-1"></span>
                <span className="w-2.5 h-2.5 bg-green-600 rounded-full absolute -top-1 -left-1"></span>
                <span className="text-gray-700"> Connected to your Wallet @: </span>
                <span className="text-green-700 ml-1.5">
                  {address}
                </span>
              </strong>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-80 text-white text-sm font-medium rounded-md" onClick={disconnectWallet}>Disconnect Wallet</button>
            </>
          ) : (
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-80 text-white text-sm font-medium rounded-md" onClick={connectWithMetamask}>
              Connect with Metamask
            </button>
          )}
          
          <li>
            <a
              className="inline-flex items-center px-3 py-2 rounded-lg"
              href="https://ethereum.org/en/dao/#what-are-daos"
              target="_blank"
            >
              What are DAOs?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-1.5 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </li>
          
        </ul>
        
      </nav>
     <>
      {message && <h1 className="mb-4 text-gray-500 text-shadow-lg text-stroke-sm text-stroke-green-500">{message}</h1>}
      {hasClaimedNFT && address &&
          <a 
           className="inline-block p-[2px] rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
           href={`https://testnets.opensea.io/assets/${deployedContract}/0`} 
           target='_blank'
           >
            <span className="block p-2 text-sm font-medium bg-white rounded-lg hover:bg-transparent">
              View your NFT
            </span>
          </a>
        }
      {!hasClaimedNFT && address &&
        <>
          <h1 className="mb-4 text-gray-500 text-shadow-lg text-stroke-sm text-stroke-blue-500">Mint your free 🧡TlcDAO Membership NFT</h1>
          <button
            disabled={isClaiming}
            onClick={mintNft}
            className="m-4 inline-block p-3 text-sm font-medium text-gray-100 transition bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg hover:transition hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
          >
            {isClaiming ?
              <div className="flex items-center justify-center">
                <span className="animate-bounce">Minting...</span>
                <div className="spinner-border animate-spin inline-block w-12 h-8 border-4 rounded-full" role="status">
                  🔆
                </div>
              </div>
              : "Mint your NFT (FREE)"}
          </button>
        </>
      }
      </>
    </div>
  );
}

export default App;
