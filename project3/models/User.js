const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  firstName: {
    type: String,
    required: [true, "First Name is required"]
  },
  lastName: {
    type: String,
    required: [true, "First Name is required"]
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  password: {
    type: String,
    required: [true, "can't be blank"]
  },
  admin: {
    type: Boolean
  }
}, { timestamps: true });

//to protect our users password
UserSchema.set('toJSON', {
  transform(doc, json){
    delete json.password;
    return json;
  }
});

//setup the password confirmation virtual
/*
UserSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
});

UserSchema.pre('validate', function checkPasswords(next){
  console.log(this.password +" "+ this._passwordConfirmation);
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
})
*/
//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.

UserSchema.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

/*
UserSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});
*/

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.validatePassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;