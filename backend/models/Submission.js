import mongoose from 'mongoose';

const { Schema } = mongoose;


const submissionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    reason: {
        type: String,
        required: true,
        enum: ['Full-time role', 'Contract / freelance work', 'Advisory / consultation', 'Partnership', 'Other']
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;