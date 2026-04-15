const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event reference is required']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9+\-\s()]{10,15}$/, 'Please enter a valid phone number']
    },
    company: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    jobTitle: {
        type: String,
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    ticketType: {
        type: String,
        enum: ['Standard', 'VIP', 'VVIP'],
        default: 'Standard'
    },
    dietaryRequirements: {
        type: String,
        enum: ['None', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free'],
        default: 'None'
    },
    referralSource: {
        type: String,
        enum: ['Social Media', 'Friend', 'Email', 'Website', 'Search Engine', 'Other'],
        default: 'Other'
    },
    agreeToTerms: {
        type: Boolean,
        required: [true, 'You must agree to the terms'],
        default: false
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'waitlisted'],
        default: 'pending'
    },
    confirmationCode: {
        type: String,
        unique: true,
        sparse: true
    },
    checkedIn: {
        type: Boolean,
        default: false
    },
    checkInTime: {
        type: Date
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

registrationSchema.index({ email: 1, event: 1 });
registrationSchema.index({ confirmationCode: 1 });
registrationSchema.index({ status: 1 });

registrationSchema.pre('save', async function(next) {
    if (!this.confirmationCode) {
        this.confirmationCode = 'FZN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    next();
});

module.exports = mongoose.model('Registration', registrationSchema);
