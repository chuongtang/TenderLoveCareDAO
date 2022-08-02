import { useAddress, useDisconnect, useMetamask, useEditionDrop, useToken, useNetwork, ChainId   } from '@thirdweb-dev/react';
// import { ChainId } from '@thirdweb-dev/sdk';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
const MemberList = lazy(() => import('./components/MemberList'));
const MemberVote = lazy(() => import('./components/MemberVote'));
const NetworkCheck = lazy(() => import('./components/NetworkCheck'));

import Navbar from './components/Navbar';
import IntroPage from './components/IntroPage';

const App: React.FC = () => {
  const address: string = useAddress()!;
  const connectWithMetamask = useMetamask()!;
  const disconnectWallet = useDisconnect()!;
  const [message, setMessage] = useState<string>('');
  const deployedContract = "0x893D52CBE48E6A4a4BB4157b64648364e38A7d96";
  const deployedToken = "0xdd899bC1C811CDB913D94c091b8F56339Fd69afa"

  const network = useNetwork()!;
  const chainName = network[0]?.data?.chain?.name!;
  console.log(chainName)
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
    <div className="p-3 m-1">
      <Navbar address={address} disconnectWallet={disconnectWallet} connectWithMetamask={connectWithMetamask} />
      {!address ? <IntroPage /> :
        (chainName!== "Rinkeby")?<NetworkCheck/> :
        <div>
          <>
          {/* {address && (chainName!== "Rinkeby")&& <NetworkCheck/>} */}
            {message && <h1 className="my-4 text-gray-500 text-shadow-lg text-stroke-sm text-stroke-green-500">{message}</h1>}
            {hasClaimedNFT &&
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
            {!hasClaimedNFT &&
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
            {memberList && <MemberList memberList={memberList} />}
            <MemberVote deployedContract={deployedContract} deployedToken={deployedToken} hasClaimedNFT={hasClaimedNFT} address={address} />

          </div>
        </div>}
    </div>
  );
}

export default App;
