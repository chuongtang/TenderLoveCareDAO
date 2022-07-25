import React from 'react';
import AppLogo from '../assets/DAOlogo3.svg'

interface Props {
  address: string;
  connectWithMetamask: ()=> void;
  disconnectWallet: ()=> void;
}

const Navbar: React.FC<Props> = ( {address, connectWithMetamask, disconnectWallet}) => {
  return (
    <header className="bg-white">
      <div
        className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8"
      >
        <a className="block text-teal-600" href="/">
        <img src={AppLogo} className="p-1 h-18" alt="app logo" /> 
        </a>

        <div className="flex items-center justify-end flex-1 md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <h2 className="sr-only" id="header-navigation">Header navigation</h2>
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                <span className="text-shadow-lg text-stroke-md text-stroke-gray-500">Tender-Loving-Care DAO</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {address ?
                        <div className="sm:gap-4 sm:flex">
                        <strong className="inline-flex items-center border border-gray-200 rounded relative p-1 text-xs font-medium m-2">
                            <span className="animate-ping w-2.5 h-2.5 bg-green-600/75 rounded-full absolute -top-1 -left-1"></span>
                            <span className="w-2.5 h-2.5 bg-green-600 rounded-full absolute -top-1 -left-1"></span>
                            <span className="text-gray-700"> Connected to: </span>
                            <span className="text-green-700 ml-1.5">
                              {address}
                            </span>
                          </strong>
                          <button
                            className="block px-2 bg-gradient-to-r from-teal-500 to-teal-700 hover:opacity-80 text-white text-sm font-medium rounded-md"
                            onClick={disconnectWallet}
                          >
                            Disconnect Wallet
                          </button>
                        </div>
                        :
            <div className="sm:gap-4 sm:flex">
              <button
                className="block px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:opacity-80 text-white text-sm font-medium rounded-md"
                onClick={connectWithMetamask}
              >
                Connect Wallet
              </button>
              
            </div>

            }<a
            className="hidden sm:block px-5 py-2.5 text-sm font-medium text-teal-600 hover:text-teal-900 hover:bg-gray-200 hover:rounded-lg"
            href="https://ethereum.org/en/dao/#what-are-daos"
            target="_blank"
          >
            What are DAOs?
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="ml-1.5 w-4 h-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
          </a>
            <button
              className="block p-2.5 text-gray-600 transition bg-gray-100 rounded md:hidden hover:text-gray-600/75"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar