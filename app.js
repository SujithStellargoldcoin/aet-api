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
    const body = {};
    fetch(`https://api.blockcypher.com/v1/btc/main/addrs`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
        return res.send({
            'ethAddress' : ethWallet.address,
            'ethPrivateKey' : ethWallet.privateKey,
            'ethMnemonic' : ethWallet.mnemonic,
            'btcPrivateKey' : json.private,
            'btcPublicKey' :json.public,
            'btcAddress' : json.address,
            'btcwif' : json.wif
        })
        })
        .catch(err => {
            return res.status(500).send({error:err});
        })
    
})

app.post('/api/v1/send',(req,res)=>{
    console.log(req);
    try
    {
        const body = req.body;
        fetch(`https://api.blockcypher.com/v1/btc/main/txs/micro?token=ec2af5def5a44966b538fe71222344f6`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json));
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
        fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${req.body.address}/full`)
        .then(res => res.json())
        .then(json => {
            return res.send({txrefs: json.txrefs})
        });
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