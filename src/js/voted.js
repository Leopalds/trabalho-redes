const Web3 = require("web3");
const contract = require("@truffle/contract");

const votingArtifacts = require("../../build/contracts/Voting.json");
var VotingContract = contract(votingArtifacts);

const resultElement = document.getElementById("result")

window.App = {
    loadResult: function(){
        window.ethereum.request({ method: "eth_requestAccounts" });
        VotingContract.setProvider(window.ethereum);
        VotingContract.defaults({
          from: window.ethereum.selectedAddress,
          gas: 6654755,
        });
        VotingContract.deployed()
        .then(async function (instance) {
          const countCandidates = (
            await instance.getCountCandidates()
          ).toNumber();
          const data = await instance.getCandidate(countCandidates.length-1);
          const id = data[0].toNumber()
          resultElement.src = id
        })
        .catch(function (err) {
          console.error("ERROR! " + err.message);
        });
    }
}

window.addEventListener("load", function () {
  if (typeof web3 !== "undefined") {
    console.warn("Using web3 detected from external source like Metamask");
    window.eth = new Web3(window.ethereum);
  } else {
    console.warn(
      "No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
    );
    window.eth = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545")
    );
  }
  window.App.loadResult();
});