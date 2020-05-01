const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const ethers = require('ethers');
const app = express();
const bitcoin = require("bitcoinjs-lib");
const fetch = require('node-fetch');
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
    try
    {
        var tx = new bitcoin.TransactionBuilder();
        tx.addOutput(req.body.to, req.body.amount);
        tx.sign(0,req.body.key);
        const body = tx.build().toHex();
        return res.send({raw : body});
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