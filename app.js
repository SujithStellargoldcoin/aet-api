const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const ethers = require('ethers');
const app = express();
const bitcoin = require("bitcoinjs-lib");
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 3000;

app.get('/ping',(req,res) =>{
    return res.send({status :"OK"});
})

app.get('/create',(req,res) => {
    let ethWallet = ethers.Wallet.createRandom();
    const keyPair = bitcoin.ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const publicKey = keyPair.publicKey.toString("hex");
    const privateKey = keyPair.toWIF();
    return res.send({
        'ethAddress' : ethWallet.address,
		'ethPrivateKey' : ethWallet.privateKey,
        'ethMnemonic' : ethWallet.mnemonic,
        'btcPrivateKey' : privateKey,
        'btcPublicKey' : publicKey,
        'btcAddress' : address
    });
})

app.post('/api/v1/balance',(req,res)=>{
    try
    {
    
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }
})

app.post('/api/v1/send',(req,res)=>{
    console.log(req);
    try
    {
        let NETWORK = bitcoin.networks.bitcoin; 
        let txb = new bitcoin.TransactionBuilder(NETWORK);
        let txid = ""; //transaction id
        let outn = 0;  // n out
        txb.addInput(txid, outn);
        txb.addOutput(req.body.to,req.body.amount); //first argument is address that will receive the funds, the second is the value to send in satoshis after deducting the mining fees. In this example there are 5000 satoshis in mining fees (40000-35000=5000)
        let key = req.body.key; //private key of the address associated with this unspent output
        txb.sign(0, key);
        let tx = txb.build();
        let txhex = tx.toHex();
        console.log (txhex);
        return res.send({raw : txhex});

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }


})

app.post('/api/v1/history',(req,res)=>{

    try
    {
        //Logic Goes Here
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }


})

app.post('/api/v1/new',(req,res)=>{

    try
    {
        //Logic Goes Here
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }


})

app.post('/api/v1/stake',(req,res)=>{

    try
    {
        //Logic Goes Here
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }


})

app.listen(PORT , ()=> {  
    console.log("Server started listening");
})