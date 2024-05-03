const {Schema,model}=require("mongoose");



const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
    type:String,
  },
  location:{
    type:String,
  },
 
},
{
  timestamps:true,
});    

const userCollection = model("user",userSchema);

module.exports = userCollection;

// "parameters":[{
//   "name":"userName",
//   "type":"string"
// }]