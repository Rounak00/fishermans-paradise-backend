//admin -> admin profile, list of fisherman - approver fisherman - reject fisherman, apporved fisherman, 
//          [admin profile admin stat -total user, total fisherman, total approved fisherman, total blocked fisherman]

const adminSchema=require("../model/AdminModel");
const fishermanSchema=require("../model/FishermanModel");
const productSchema=require("../model/ProductModel");
const customerSchema=require("../model/CustomerModel");



const adminController={
    async adminProfile(req,res,next){
        try{ 
        const profile=await adminSchema.findById(req.user.id);
        res.status(200).json(profile);
        }catch(err){next(err);}
    },
    async fishermanList(req,res,next){
        try{ 
        const list=await fishermanSchema.find();
        res.status(200).json(list);
        }catch(err){next(err);}
    },
    async approvedFishermanList(req,res,next){
        try{ 
        const list=await fishermanSchema.find({approve:true});
        res.status(200).json(list);
        }
        catch(err){next(err);}
    },
    async notApprovedFishermanList(req,res,next){
        try{ 
        const list=await fishermanSchema.find({approve:false});
        res.status(200).json(list);
        }
        catch(err){next(err);}
    },
    async markApproved(req,res,next){
        try{ 
        let id=req.params.id;
        const profile=await fishermanSchema.findByIdAndUpdate(id,{ $set: { approve: true }});
        res.status(200).json(profile);
        }catch(err){next(err);}
    },
    async markNotApproved(req,res,next){
        try{ 
        let id=req.params.id;
        const profile=await fishermanSchema.findByIdAndUpdate(id,{ $set: { approve: false }});
        res.status(200).json(profile);
        }catch(err){next(err);}
    },
    async adminDashboard(req,res,next){
        try{
          let user=await customerSchema.find().countDocuments();
          let fisherman=await fishermanSchema.find().countDocuments();
          let nafisherman=await fishermanSchema.find({approve:false}).countDocuments();
          let afisherman=await fishermanSchema.find({approve:true}).countDocuments();
          res.status(200).json({user,fisherman,nafisherman,afisherman});
        }catch(err){next(err);}
    }
    
}

module.exports=adminController;