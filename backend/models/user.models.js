import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;