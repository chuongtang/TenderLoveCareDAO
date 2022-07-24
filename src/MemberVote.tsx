import React, { useState, useEffect } from 'react'
import { useVote } from '@thirdweb-dev/react';



interface Props {
  deployedContract: string;
  deployedToken: string;
  hasClaimedNFT: boolean;
  address: string;
}

const MemberVote = ({ deployedContract, deployedToken, hasClaimedNFT, address } : Props) => {

  const vote = useVote("0x9393fb107aA2BD1BAe191E82422BC2Fc519fB728")!;

  const [proposals, setProposals] = useState<any[]>([]);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // A simple call to vote.getAll() to grab the proposals.
    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
        console.log("🌈 Proposals:", proposals);
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  // We also need to check if the user already voted.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted");
        } else {
          console.log("🙂 User has not voted yet");
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();

  }, [hasClaimedNFT, proposals, address, vote]);
  return (
    <div>
      <h1>{deployedContract}</h1>
      <h1>{deployedToken}</h1>
      <h1>{!hasClaimedNFT} This is </h1>
    </div>
  )
}

export default MemberVote