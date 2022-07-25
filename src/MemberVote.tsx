import React, { useState, useEffect } from 'react'
import { useToken, useVote } from '@thirdweb-dev/react';
import { AddressZero } from "@ethersproject/constants";


interface Props {
  deployedContract: string;
  deployedToken: string;
  hasClaimedNFT: boolean;
  address: string;
}

interface Vote {
  type: number;
  label: string;
  count: number;

}

const MemberVote = ({ deployedContract, deployedToken, hasClaimedNFT, address }: Props) => {
  // Initialize our vote contract
  const vote = useVote("0x9393fb107aA2BD1BAe191E82422BC2Fc519fB728")!;
  // Initialize our token contract
  const token = useToken(deployedToken)!;

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

  const voteProposal: React.FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //before we do async things, we want to disable the button to prevent double clicks
    setIsVoting(true);

    // lets get the votes from the form for the values
    const votes = proposals.map((proposal) => {
      const voteResult = {
        proposalId: proposal.proposalId,
        //abstain by default
        vote: 2,
      };
      proposal.votes.forEach((vote: Vote) => {
        const elem = document.getElementById(
          proposal.proposalId + "-" + vote.type
        ) as HTMLInputElement;

        if (elem.checked) {
          voteResult.vote = vote.type;
          return;
        }
      });
      return voteResult;
    });

    // first we need to make sure the user delegates their token to vote
    try {
      //we'll check if the wallet still needs to delegate their tokens before they can vote
      const delegation = await token.getDelegationOf(address);
      // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
      if (delegation === AddressZero) {
        //if they haven't delegated their tokens yet, we'll have them delegate them before voting
        await token.delegateTo(address);
      }
      // then we need to vote on the proposals
      try {
        await Promise.all(
          votes.map(async ({ proposalId, vote: _vote }) => {
            // before voting we first need to check whether the proposal is open for voting
            // we first need to get the latest state of the proposal
            const proposal = await vote.get(proposalId);
            // then we check if the proposal is open for voting (state === 1 means it is open)
            if (proposal.state === 1) {
              // if it is open for voting, we'll vote on it
              return vote.vote(proposalId, _vote);
            }
            // if the proposal is not open for voting we just return nothing, letting us continue
            return;
          })
        );
        try {
          // if any of the propsals are ready to be executed we'll need to execute them
          // a proposal is ready to be executed if it is in state 4
          await Promise.all(
            votes.map(async ({ proposalId }) => {
              // we'll first get the latest state of the proposal again, since we may have just voted before
              const proposal = await vote.get(proposalId);

              //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
              if (proposal.state === 4) {
                return vote.execute(proposalId);
              }
            })
          );
          // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
          setHasVoted(true);
          // and log out a success message
          console.log("successfully voted");
        } catch (err) {
          console.error("failed to execute votes", err);
        }
      } catch (err) {
        console.error("failed to vote", err);
      }
    } catch (err) {
      console.error("failed to delegate tokens");
      console.log(err)
    } finally {
      // in *either* case we need to set the isVoting state to false to enable the button again
      setIsVoting(false);
    }
  }


  return (
    <div className="text-center mx-auto">
      <h1 className="mb-4 text-gray-500 text-shadow-lg text-stroke-sm text-stroke-green-700">Active Proposals</h1>
      <form
        onSubmit={voteProposal}
         >
        {proposals.map((proposal) => (
          <div key={proposal.proposalId} 
          className="p-1 shadow-xl rounded-2xl bg-gradient-to-r from-green-600 to-indigo-200 mb-2">
            <h5 className="text-md font-semibold text-white p-2">
              {proposal.description}</h5>
              {proposal.votes.map(({ type, label }: Vote) => (
                <div key={type}
                  className="inline-block text-white text-xs font-medium justify-end">
                  <label htmlFor={proposal.proposalId + "-" + type} className="cursor-pointer p-1 justify-center">
                    <input type="radio" name={proposal.proposalId} value={type} defaultChecked={type === 2} id={proposal.proposalId + "-" + type} className="sr-only peer" />

                    <span className="inline-flex items-center justify-center h-8 text-xs font-medium border rounded-lg group peer-checked:bg-indigo-900 peer-checked:text-white p-4">
                      {label}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        ))}
        <div className="flex flex-col">
        <button disabled={isVoting || hasVoted} type="submit"
          className="relative inline-block px-8 py-3 overflow-hidden border border-green-600 rounded-lg group focus:outline-none focus:ring w-1/2 mx-auto"
        >
           <span className="absolute inset-y-0 left-0 w-[2px] transition-all bg-green-600 group-hover:w-full group-active:bg-indigo-500"></span>
          <span
            className="relative text-sm font-medium text-green-600 transition-colors group-hover:text-white"
          >
            {isVoting
              ? "Voting..."
              : hasVoted
                ? "You Already Voted"
                : "Submit Votes"}
          </span>
        </button>
        {!hasVoted && (
          <small className="text-xs italic m-2 font-light tracking-tight text-gray-500/50 overflow-ellipsis">
            *This will trigger multiple transactions that you will need to
            sign.
          </small>
        )}
        </div>
      </form>
    </div>
  )
}

export default MemberVote