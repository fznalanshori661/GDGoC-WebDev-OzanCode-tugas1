const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true,
        maxlength: [200, 'Event name cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    endDate: {
        type: Date
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    city: {
        type: String,
        default: 'Surabaya'
    },
    venue: {
        type: String,
        required: [true, 'Venue is required']
    },
    category: {
        type: String,
        enum: ['Tech', 'Business', 'Design', 'Marketing', 'Workshop', 'Conference', 'Networking', 'Other'],
        default: 'Tech'
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: 'IDR'
    },
    image: {
        type: String,
        default: 'default-event.jpg'
    },
    speakers: [{
        name: String,
        role: String,
        company: String,
        avatar: String
    }],
    sponsors: [{
        name: String,
        logo: String,
        website: String
    }],
    agenda: [{
        time: String,
        title: String,
        description: String,
        speaker: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    registrationDeadline: {
        type: Date
    },
    contact: {
        email: String,
        phone: String,
        whatsapp: String
    }
}, {
    timestamps: true
});

eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ city: 1 });

module.exports = mongoose.model('Event', eventSchema);
