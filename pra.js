const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true })
// .then(() => {  console.log(`Connected to Mongodb .`) } )
// .catch((e)=> console.log( 'error', e.Message));

mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {  console.log(`Connected to Mongodb .`) } )
.catch((e)=> console.log( 'error', e.Message));

const userModel = mongoose.model('cal',new mongoose.Schema(
    {
        name:{type:String},
        password:{type:String},
        mobileNum:{type:String},
        email:{type:String}  
    }
))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.post('/save',async(req,res,)=>{
    try {
       
        let { name }=req.body;
        console.log(name);
        let u = await userModel.findOne({name:name});
        if(u) return res.status(200).send({msg:"User already exist errth"});
        let db=await userModel(req.body).save();
        let ob='file:///C:/Users/user/Desktop/Yogesh/userData.html';
        res.status(201).send({msg:"user data sucesssfully",ob})
    } 
    catch (error)
     {
        console.log(error);
        
    }
})


app.get('/getall',(req,res)=>{

    let data= userModel.find({});
    
    res.status(200).send({data});


})


app.get('/getalldata',async(req,res)=>{

    let data=await userModel.find({},{password:0,mobileNum:0,_id:0,EmailId:0}).sort({name:-1});
    
    res.status(200).send({data});


})


app.post('/add',async(req,res)=>{
     try {
         
         let { name }  = req.body; 
         let User =  await userModel.find({name:name});
         
         if(User) return res.status(200).send({msg:"User Already exists."}); 
         
         let Userres =  await userModel(req.body).save();
    
          
         res.status(201).send({msg:"User data get sucessfully", Userres});
         
     } 
     catch (error) 
     
     {
       console.log(error);
     }
    })

let port = process.env.PORT || 5000;
app.listen(port , ()=>{               
    console.log(`listening on port ${port}`);
})