const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "jar leisure find argue sing boil client advice party urge screen mix",
  "https://rinkeby.infura.io/v3/ba8d56117e6e45f3a984b4abec2312ca"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy from", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["first message"] })
    .send({ from: accounts[0], gas: "5000000" });
  console.log("contract deployed to", result.options.address);
};

deploy();
