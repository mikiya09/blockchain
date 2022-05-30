

const main = async () => {

    const tradeInfo = await hre.ethers.getContractFactory("tradeInfo");
    const tradeinfo = await tradeInfo.deploy();

    await tradeinfo.deployed();

    console.log("TradeInfo deployed to: ", tradeinfo.address);

}


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    
    }   catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();

