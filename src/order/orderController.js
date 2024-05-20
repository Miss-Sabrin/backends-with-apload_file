const Order = require("./orderModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      productId,
      category,
      user,
      paymentMethod,
      status,
      desc,
      quantity,
      total,
    } = req.body;
    const order = new Order({
      productId,
      category,
      user,
      paymentMethod,
      status,
      desc,
      quantity,
      total,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//todo all data 
exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .populate("category")
      .populate("user");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


 //todo find by id
 exports.getOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)


        res.status(200).json({status:"success",data:order})

    }catch(e){
        res.status(401).json({status:"fail",message:e.toString()});
    }

}

     ///todo delete product
     exports.deleteOrder=async(req,res)=>{
        try{
            const order=await Order.findByIdAndDelete(req.params.id);


            res.status(200).json({status:"success",data:'succesfullay deleted'})



        }catch(e){
            res.status(401).json({status:"fail",message:e.toString()});
        }

    },

    
//      //todo update product
   exports.updateOrder=async(req,res)=>{
    try{
        const order=await Order.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
    });


        res.status(200).json({status:"success",data:Order})



    }catch(e){
        res.status(401).json({status:"fail",message:e.toString()});
    }

}



