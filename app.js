const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const ethers = require('ethers');
const usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const aetAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"onePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"},{"name":"_Address","type":"address"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"_from","type":"address"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const provider = ethers.getDefaultProvider();
const app = express();
const bitcoin = require("bitcoinjs-lib");
const fetch = require('node-fetch');
const adminBtcKey  = '';
const adminBtc = '';
const adminEth = '';
const adminEthKey = ''
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

app.post('/api/v1/send/btc',(req,res)=>{
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

app.post('/api/v1/send/eth',(req,res)=>{
    try
    {
        let provider = ethers.getDefaultProvider();
        let privateKey = req.body.key
        let wallet = new ethers.Wallet(privateKey, provider);
        let amount = ethers.utils.parseEther(req.body.amount);
        let tx = {
            to: req.body.reciever,
            value: amount
        };
        
        let sendPromise = wallet.sendTransaction(tx);
        sendPromise.then((tx) => {
            console.log(tx);
        });
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
        fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${req.body.address}`)
        .then(res => res.json())
        .then(json => {
            if(json.txrefs.length !== 0){
            return res.send({txrefs: json.txrefs})
            }
            else{
                return res.send({txrefs:[]})
            }
        });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }
})

app.post('/api/v1/coinHistory',(req,res)=>{
    try
    {
        fetch(`http://api.etherscan.io/api?module=account&action=tokentx&address=${req.body.address}&startblock=0&endblock=999999999&sort=asc&apikey=TRRWHTZB2AQG44YVWDIYZ45JPAHA3T1FHY`)
        .then(res => res.json())
        .then(json => {
            if(json.result == [] || json.result ==null){
              return res.end({txrefs:[]})
            }
            else{
            return res.send({txrefs: json.result})
            }
        });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }
})


app.post('/api/v1/exchange/btc',(req,res)=>{
    try
    {
        const body = {
                to_address : adminBtc,
                value_satoshis : req.body.value_satoshis,
                from_private: this.state.from_private,
        };
        fetch(`https://api.blockcypher.com/v1/btc/main/txs/micro?token=ec2af5def5a44966b538fe71222344f6`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            let privateKey = adminEthKey;
            let wallet = new ethers.Wallet(privateKey, provider); 
            const aetContract = new ethers.Contract(aet, aetAbi, wallet);
            let amount = ethers.utils.parseEther(`${req.body.aetAmount}`);
            try{
                aetContract.transfer(`${req.body.aetReciever}`,amount)
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
                    alert(err);
                })
            }
            catch(err){
                alert(err);
            }
        })
        .catch(err=>{
            console.log(err);
        })

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send({error:err});
    }
})

app.post('/api/v1/exchange/eth',(req,res)=>{
    let privateKey = req.body.privateKey;
    let wallet = new ethers.Wallet(privateKey, provider); 
    let tx = {
        to: '0x4742A08d64091B6a1c4104984f3b0331B1C95f4f',
        value: ethers.utils.parseEther(`${req.body.amount}`)
    };      
    try{
        let sendPromise = wallet.sendTransaction(tx);
        sendPromise.then((tx) => {
            if(tx.hash){
                let privateKey = adminEthKey;
                let wallet = new ethers.Wallet(privateKey, provider); 
                const aetContract = new ethers.Contract(aet, aetAbi, wallet);
                let amount = ethers.utils.parseEther(`${req.body.aetAmount}`);
                try{
                    aetContract.transfer(`${req.body.aetReciever}`,amount)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        alert(err);
                    })
                }
                catch(err){
                    alert(err);
                }
            }
        })
        .catch(err=>{
            alert(err);
        })
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