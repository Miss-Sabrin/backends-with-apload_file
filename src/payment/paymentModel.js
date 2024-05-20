const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,

        },
        description:{
            type:String,

        },
        type:{
            type:String
        }


    }
)

module.exports=mongoose.model('payment',PaymentSchema);