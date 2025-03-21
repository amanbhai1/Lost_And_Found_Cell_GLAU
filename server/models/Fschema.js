import mongoose from 'mongoose';

const F_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Fschema = mongoose.model("feedback", F_schema);
export default Fschema;

