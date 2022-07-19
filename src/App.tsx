import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import AppLogo from '../src/assets/DAOlogo3.svg'
function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  return (
    <div>
      <nav className="flex items-center justify-between p-4 mx-auto">
        <a
          className="inline-flex items-center justify-center h-10 rounded-lg"
          href="/"
        >
          <img src={AppLogo} className="p-6 h-25" alt="app logo"/> <span className="text-shadow-lg text-stroke-md text-stroke-gray-500">Tender-Loving-Care DAO</span>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}

export default App;
