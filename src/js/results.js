const Web3 = require("web3");
const contract = require("@truffle/contract");

const votingArtifacts = require("../../build/contracts/Voting.json");
var VotingContract = contract(votingArtifacts);

window.App = {
  loadResults: function () {
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
        let totalVotes = 0;
        let candidatesData = [];

        // Primeiro, obter os dados de todos os candidatos e calcular o total de votos
        for (let i = 1; i <= countCandidates; i++) {
          const data = await instance.getCandidate(i);
          const id = data[0].toNumber();
          const name = data[1];
          const party = data[2];
          const voteCount = data[3].toNumber();

          totalVotes += voteCount;

          candidatesData.push({
            id,
            name,
            party,
            voteCount,
          });
        }

        // Agora, exibir os dados na tabela
        candidatesData.forEach((candidate) => {
          const percentage =
            totalVotes > 0
              ? ((candidate.voteCount / totalVotes) * 100).toFixed(2)
              : 0;

          const viewCandidate = `
          <tr>
            <td>${candidate.name}</td>
            <td>${candidate.party}</td>
            <td>${candidate.voteCount}</td>
            <td>${percentage}%</td>
          </tr>
        `;
          $("#boxCandidate").append(viewCandidate);
        });
      })
      .catch(function (err) {
        console.error("ERROR! " + err.message);
      });
  },
};

$(document).ready(function () {
  if (typeof web3 !== "undefined") {
    console.warn("Usando web3 detectado de uma fonte externa como o Metamask");
    window.eth = new Web3(window.ethereum);
  } else {
    console.warn(
      "Nenhum web3 detectado. Revertendo para http://localhost:9545."
    );
    window.eth = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545")
    );
  }

  window.App.loadResults();
});
