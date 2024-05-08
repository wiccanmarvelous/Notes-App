import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    title: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true,
        default: "white"
    }
}, {
    timestamps: true
});

const Card = mongoose.model('Card', cardSchema);

export default Card;