const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userModel = mongoose.model('cal',new mongoose.Schema(
    {
        day:{type:String},
        month:{type:String},
        year:{type:String},
       // email:{type:String}
    }
))

mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {  console.log(`Connected to Mongodb .`) } )
.catch((e)=> console.log( 'error', e.Message));


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.post('/wastTime',async(req,res)=>{

let{ day,month ,year,name}=req.body;

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

let calAge=calculate_age(new Date(year, month, day));

res.status(200).send({msg:'youre data',calAge,name})  
//console.log(calculate_age(new Date(1962, 1, 1)));



})


let port = process.env.PORT || 3000;
app.listen(port , ()=>{               
    console.log(`listening on port ${port}`);
})