import React from 'react'

interface holder {
  address: string;
  tokenAmount: number;
}

interface Props {
  memberList: holder[];
}
const MemberList = ({ memberList }: Props) => {

  const shortenAddress = (str: string) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };
  return (
    <div className="md:5/12 lg:w-5/12 mx-auto">
      <div className="text-center text-shadow-lg text-stroke-md text-stroke-green-500/50 text-lg">Member List</div>
      <div className="flex flex-col m-4 rounded-lg mx-auto shadow-xl overflow-hidden">
        <table className="divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="p-4 text-left text-base font-medium text-gray-500 text-center uppercase dark:text-gray-400">Address</th>
              <th scope="col" className="p-4 text-left text-base font-medium text-gray-500 text-center uppercase dark:text-gray-400">Token Amount</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {memberList.map((member: { address: string, tokenAmount: number }) => {
              return (
                <tr key={member.address}>
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 text-center">{shortenAddress(member.address)}</td>
                  <td className="p-4 whitespace-nowrap text-right text-sm text-gray-800 dark:text-gray-200">{~~(member.tokenAmount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MemberList;