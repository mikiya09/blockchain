


require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        goerli: {
            url: 'https://eth-goerli.alchemyapi.io/v2/M1KHYO4eqiy9d0egNvlj0LxBmjhnHdCb',
            accounts: [ '32c1805d9fd3e02ce4ad237fd1e09ad2b32ecb10499f6e8c6cebfb074ab62a4d' ]
        }
    }
}

