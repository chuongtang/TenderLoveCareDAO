import React from 'react'
import { useNetwork, ChainId } from "@thirdweb-dev/react";
import '../App.css'

const NetworkCheck = () => {
  const [, switchNetwork] = useNetwork()!;
  return (
    <div className="m-4 p-8 bg-white border border-blue-100 shadow-lg rounded-2xl" role="alert">
      <div className="items-center sm:flex">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-blue-400 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fill-rule="evenodd"
            />
          </svg>
        </span>

        <p className="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">Please connect to Rinkeby Testnet</p>
      </div>

      <p className="mt-4 text-gray-500">
      This dapp only works on the Rinkeby network, please switch networks
        in your connected wallet.
      </p>

      <div className="mt-6 sm:flex">
        <button
          className="gradientBorder text-stroke-gray-500 text-stroke-md"
          // @ts-ignore
          onClick={() => switchNetwork(ChainId.Rinkeby)}
        >
          Switch Now
        </button>
      </div>
    </div>

  )
}

export default NetworkCheck