//const user = require('../models/user');
const Payment=require('./paymentModel');


module.exports={
    //todo create payment 👍
    createPayment:async(req,res)=>{
        try{
            const {name,description,type}=req.body;

        const payment= await Payment({
                name:name,
               description:description,
               type:type
            ,
            }).save();


            res.status(200).json({status:"success",data:payment})


        }catch(e){
            res.status(401).json({status:"fail",message:e.toString()});
        }

    },

    ///todo get data
    getPayment:async(req,res)=>{
        try{

       const payments=await Payment.find()


            res.status(200).json({status:"success",data:payments})

        }catch(e){
            res.status(401).json({status:"fail",message:e.toString()});
        }

    },

};




