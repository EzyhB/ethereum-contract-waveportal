const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  let waveTxn = await waveContract.wave("Saah Doooood!");
  await waveTxn.wait();
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );
  let waveTxn2 = await waveContract.wave("Ayo Saaaaaaah!");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log("All Waves: ", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); //exit Node process while indicating 'Uncaught fatal exception' error
  }
};

runMain();


