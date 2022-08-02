import React from 'react';

interface Props {
  address: string;
  connectWithMetamask: ()=> void;
  disconnectWallet: ()=> void;
}

const MemberScreen = () => {
  return (
    <div>
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
  )
}

export default MemberScreen;