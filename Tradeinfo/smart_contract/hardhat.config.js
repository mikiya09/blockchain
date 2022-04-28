

require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        ropsten: {
            url: 'https://eth-ropsten.alchemyapi.io/v2/5tjVJrUpGEZw1C6WWWek81L8eh2inHXE',
            accounts: [ '32c1805d9fd3e02ce4ad237fd1e09ad2b32ecb10499f6e8c6cebfb074ab62a4d' ]
        }
    }
}
