const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inboxContract;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of the accounts to deploy the contract

  // deploy
  inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inboxContract.options.address);
  });
  it("contains initial message", async () => {
    const message = await inboxContract.methods.getMessage().call();
    assert.equal(message, "Hi there!");
  });
  it("sets a new message", async () => {
    const newMessage = await inboxContract.methods
      .setMessage("New message")
      .send({ from: accounts[0], gas: "1000000" });

    const message = await inboxContract.methods.getMessage().call();
    assert.equal(message, "New message");
  });
});
