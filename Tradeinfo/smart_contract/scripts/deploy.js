


const main = async () => {
    const Tradeinfo = await hre.ethers.getContractFactory("tradeinfo");
    const tradeinfo = await Tradeinfo.deploy();

    await tradeinfo.deployed();

    console.log("Tradeinfo deployed to: ", tradeinfo.address);
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


runMain()
