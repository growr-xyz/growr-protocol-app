# growr-protocol-app

Web application for protocol and lending pools governance (pool creation, funding &amp; withdrawal)

### Configuration:

Config files:
- eligibilityCriteria.json - possible pond requirements
- forcedNetworks.json - supported blockchain networks
- tokens.json - list of all tokens that the app will support

ENV variables:
- NEXT_PUBLIC_POND_FACTORY_ADDRESS=...

Note: The current version of Growr protocol on RSK testnet is 0.3:
- PondFactory             : 0x6069A41Ac8d73b7aE193f4890db1E84Df28a6835

### Start the protocol app

1. yarn dev / npm run dev - start the app locally

### Setup 

#### Setup with local node

1. Get "growr-core-protocol" application up and running
  - start local node
  - deploy the protocol (pond factory + verification registry)
  - mint tokens

Follow the instructions in the Readme file of the protocol [(https://github.com/growr-xyz/growr-core-protocol)](https://github.com/growr-xyz/growr-core-protocol).

2. Configure Metamask in your browser
  - install Metamask extension to your browser
  - create an account
  - configure localhost network (RPC URL: http://localhost:8545, Chain ID: 31337)
  - select the network

#### Setup with RSK Testnet

1. Connect Metamask to RSK Testnet Network
  - install Metamask extension to your browser
  - create an account
  - configure RSK TestNet [see instructions here](https://developers.rsk.co/wallet/use/metamask/)
  - select the network
  - use [RSK Testnet Faucet](https://faucet.rsk.co/) to get some RBTC

### Demo
You can watch a demo video [here](https://www.youtube.com/watch?v=5J9qBhG-uqQ)