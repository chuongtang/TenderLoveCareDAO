import React from 'react';
import TLCbackground from '../assets/TLCbackground.jpg'

const IntroPage = () => {
  return (
    <div className="pt-32 pb-20 md:pt-40">
      <div className="container m-auto px-6 md:px-12 lg:px-6">
        <div className="lg:flex lg:items-center lg:gap-x-16">
          <div className="space-y-8 lg:w-7/12">
            <h1 className=" font-bold text-gray-900 text-3xl md:text-4xl">Tender - Loving - Care DAO</h1>
            <p className="text-gray-500 lg:w-11/12 italic text-shadow-md text-right tracking-tight">
              The most important medicine is tender love and care. <span className="text-xs">_ Mother Teresa</span>
            </p>
            <p className="text-gray-600 lg:w-11/12">
              This is a DAO for Tender-Loving-Care people that receive $❤TLC whenever they do nice things or being kind to others.
            </p>

            <span className="block font-semibold">Responsively built with: </span>

            <div className="grid grid-cols-3 space-x-4 md:space-x-6 md:flex">
              <a aria-label="add to slack" href="https://buildspace.so/p/build-dao-with-javascript" className="p-4 border border-gray-200 rounded-md hover:border-cyan-400 hover:shadow-lg">
                <div className="flex justify-center space-x-4">
                  <img className="w-6" src="https://chuongtang.github.io/sourceStore/smallLogos/BuildSpace.jpg" alt="Buildspace logo" loading="lazy" width="128" height="128" />
                    <span className="hidden font-medium md:block">Buildspace</span>
                </div>
              </a>
              <a aria-label="add to chat" href="https://portal.thirdweb.com/typescript" className="p-4 border border-gray-200 rounded-md hover:border-green-400 hover:shadow-lg">
                <div className="flex justify-center space-x-4">
                  <img className="w-6" src="https://chuongtang.github.io/sourceStore/logos/Thirdweb.jpg" alt="Thirdweb logo" loading="lazy" width="128" height="128" />
                    <span className="hidden font-medium md:block">ThirdWeb</span>
                </div>
              </a>
              <a aria-label="add to zoom" href="https://www.typescriptlang.org/" className="p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-lg">
                <div className="flex justify-center space-x-4">
                  <img className="w-6" src="https://chuongtang.github.io/sourceStore/smallLogos/TypeScript.jpg" alt="TypeScript logo" loading="lazy" width="128" height="128" />
                    <span className="hidden font-medium md:block">TypeScript</span>
                </div>
              </a>
            </div>
          </div>

          <div hidden className="lg:block lg:w-5/12">
            <img src={TLCbackground} className="w-full rounded-xl" alt="wath illustration" loading="lazy" width="320" height="280" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroPage