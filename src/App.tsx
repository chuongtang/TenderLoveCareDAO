import { useAddress, useDisconnect, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import AppLogo from '../src/assets/DAOlogo3.svg'
import MemberList from './components/MemberList';
import MemberVote from './components/MemberVote';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const address: string = useAddress()!;
  const connectWithMetamask = useMetamask()!;
  const disconnectWallet = useDisconnect()!;
  const [message, setMessage] = useState<string>('');
  const deployedContract = "0x893D52CBE48E6A4a4BB4157b64648364e38A7d96";
  const deployedToken = "0xdd899bC1C811CDB913D94c091b8F56339Fd69afa"

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(deployedContract)!;
  // Initialize our token contract
  const token = useToken(deployedToken)!;
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState<Array<any>>([]);
  const [memberAddresses, setMemberAddresses] = useState<Array<string>>([]);



  useEffect(() => {
    const checkBalance = async (): Promise<void> => {
      try {
        //  query the smart contract to check if the user has our NFT.
        const balance = await editionDrop.balanceOf(address as string, 0);

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
      await editionDrop.claim(0, 1);
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

  // ⬇ Grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log('\x1b[34m%s\x1b[0m', "🚀 Members addresses", memberAddresses);
      } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', "failed to get member list", error);
      }

    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  // ⬇ Grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log('\x1b[32m%s\x1b[0m', "👜 Amounts", amounts);
      } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', "failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // We're checking if we are finding the address in the memberTokenAmounts array.
      // If we are, we'll return the amount of token the user has.
      // Otherwise, return 0.
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);

      return {
        address,
        tokenAmount: member?.balance.displayValue || 0,
      }
    });
  }, [memberAddresses, memberTokenAmounts]);

  return (
    <div className="p-3">
      <Navbar address={address} disconnectWallet={disconnectWallet} connectWithMetamask={connectWithMetamask} />
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
                <span className="text-gray-700"> Connected to: </span>
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
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        {memberList && address && <MemberList memberList={memberList} />}
        {address && <MemberVote deployedContract={deployedContract} deployedToken={deployedToken} hasClaimedNFT={hasClaimedNFT} address={address} />}
      </div>
    </div>
  );
}

export default App;
