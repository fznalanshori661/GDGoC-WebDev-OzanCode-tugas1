const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { registrationValidation } = require('../middleware/validation');

router.post('/', registrationValidation, async (req, res) => {
    try {
        const {
            eventId,
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            ticketType,
            dietaryRequirements,
            referralSource,
            agreeToTerms,
            newsletter,
            notes
        } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.isActive) {
            return res.status(400).json({ error: 'Event registration is closed' });
        }

        if (event.registrationDeadline && new Date() > event.registrationDeadline) {
            return res.status(400).json({ error: 'Registration deadline has passed' });
        }

        if (event.registeredCount >= event.capacity) {
            return res.status(400).json({ error: 'Event is fully booked' });
        }

        const existingRegistration = await Registration.findOne({ email, event: eventId });
        if (existingRegistration) {
            return res.status(400).json({ error: 'You have already registered for this event' });
        }

        const registration = new Registration({
            event: eventId,
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            ticketType: ticketType || 'Standard',
            dietaryRequirements: dietaryRequirements || 'None',
            referralSource: referralSource || 'Other',
            agreeToTerms: agreeToTerms === true || agreeToTerms === 'true',
            newsletter: newsletter || false,
            notes,
            status: 'confirmed'
        });

        await registration.save();

        await Event.findByIdAndUpdate(eventId, {
            $inc: { registeredCount: 1 }
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: {
                confirmationCode: registration.confirmationCode,
                registration: {
                    id: registration._id,
                    firstName: registration.firstName,
                    lastName: registration.lastName,
                    email: registration.email,
                    ticketType: registration.ticketType,
                    status: registration.status
                },
                event: {
                    name: event.name,
                    date: event.date,
                    venue: event.venue,
                    location: event.location
                }
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already registered for this event' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

router.get('/event/:eventId', async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.eventId })
            .select('-__v')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: registrations,
            total: registrations.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
});

router.get('/confirmation/:code', async (req, res) => {
    try {
        const registration = await Registration.findOne({ 
            confirmationCode: req.params.code 
        }).populate('event');

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        res.json({
            success: true,
            data: {
                confirmationCode: registration.confirmationCode,
                registrant: {
                    firstName: registration.firstName,
                    lastName: registration.lastName,
                    email: registration.email,
                    ticketType: registration.ticketType
                },
                event: registration.event ? {
                    name: registration.event.name,
                    date: registration.event.date,
                    venue: registration.event.venue,
                    location: registration.event.location
                } : null,
                status: registration.status,
                checkedIn: registration.checkedIn
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch registration' });
    }
});

router.patch('/:id/checkin', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { 
                checkedIn: true, 
                checkInTime: new Date() 
            },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        res.json({
            success: true,
            message: 'Check-in successful',
            data: registration
        });
    } catch (error) {
        res.status(500).json({ error: 'Check-in failed' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        await Event.findByIdAndUpdate(registration.event, {
            $inc: { registeredCount: -1 }
        });

        await Registration.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Registration cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel registration' });
    }
});

module.exports = router;
