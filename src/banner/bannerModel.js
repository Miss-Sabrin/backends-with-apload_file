const mongoose=require('mongoose');

const BannerSchema=new mongoose.Schema(
    {
        name: { type: String, required: true },
        desc: { type: String },
        photo: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },

    
      },
      {
        timestamps: true,
      }
    );
    
    module.exports=mongoose.model("Banner",BannerSchema)


   

