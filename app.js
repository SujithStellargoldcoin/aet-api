const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 3000;

app.get('/ping',(req,res) =>{

    return res.send({status :"OK"});
})

app.post('/api/v1/balance',(req,res)=>{

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

app.post('/api/v1/send',(req,res)=>{

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