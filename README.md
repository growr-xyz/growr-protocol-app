# growr-protocol-app

Web application for protocol and lending pools governance (pool creation, funding &amp; withdrawal)

### Configuration:

Config files:
- eligibilityCriteria.json - possible pond requirements
- forcedNetworks.json - supported blockchain networks
- tokens.json - list of all token that the app will support

ENV variables:
- NEXT_PUBLIC_POND_FACTORY_ADDRESS=...

### Setup 

#### Setup with local node

1. Get "growr-core-protocol" application up and running
  - start local node
  - deploy the protocol (pond factory + verification registry)
  - mint tokens

Follow the instructions in the Readme file of the application [(https://github.com/growr-xyz/growr-core-protocol)](https://github.com/growr-xyz/growr-core-protocol).

2. Configure Metamask in your browser
  - create an account
  - configure localhost network (RPC URL: http://localhost:8545, Chain ID: 31337)
  - select the network

#### Setup with RSK Testnet

1. Connect Metamask to RSK Testnet Network
  - create an account
  - configure RSK TestNet [see instructions here](https://developers.rsk.co/wallet/use/metamask/)
  - select the network

### Start the protocol app

1. yarn dev / npm run dev - start the app locally