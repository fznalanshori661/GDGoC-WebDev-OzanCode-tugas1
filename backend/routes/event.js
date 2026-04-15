const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { eventValidation } = require('../middleware/validation');

router.post('/', eventValidation, async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event
        });
    } catch (error) {
        console.error('Event creation error:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            city, 
            status, 
            page = 1, 
            limit = 10,
            upcoming = 'true'
        } = req.query;

        const query = { isActive: true };
        
        if (category) query.category = category;
        if (city) query.city = city;
        if (status) query.status = status;
        if (upcoming === 'true') {
            query.date = { $gte: new Date() };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const events = await Event.find(query)
            .sort({ date: upcoming === 'true' ? 1 : -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Event.countDocuments(query);

        res.json({
            success: true,
            data: events,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalEvents: total,
                hasMore: skip + events.length < total
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const featuredEvents = await Event.find({ 
            isActive: true,
            date: { $gte: new Date() }
        })
        .sort({ registeredCount: -1, date: 1 })
        .limit(3);

        res.json({
            success: true,
            data: featuredEvents
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch featured events' });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Event.distinct('category', { isActive: true });
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({
            success: true,
            data: event,
            availability: {
                spotsLeft: event.capacity - event.registeredCount,
                isFull: event.registeredCount >= event.capacity
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({
            success: true,
            message: 'Event updated successfully',
            data: event
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;
