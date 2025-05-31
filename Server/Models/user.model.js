const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }, 
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v);
      },
      message: props => `Password must contain uppercase, lowercase letters, and one number.`
    }
  },
   role:{
        type:Boolean,
        default:false
    },
    profileImage:{
        type:String,
        default:"https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
    },
  shoppingPreference: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids', 'All'] // Modify as needed
  },
  dateOfBirth: {
    type:Date,
    required:true
  },
  location: {
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    state: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    postcode: {
      type: String,
      required: false
    }
  },
   isVerified: {
    type: Boolean,
    default: false 
  }
},{
    timestamps:true
})

const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel