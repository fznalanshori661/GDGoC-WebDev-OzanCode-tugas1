const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

const registrationValidation = [
    body('eventId')
        .notEmpty().withMessage('Event ID is required')
        .isMongoId().withMessage('Invalid Event ID format'),
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Invalid phone number format'),
    body('company')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
    body('jobTitle')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Job title cannot exceed 100 characters'),
    body('ticketType')
        .optional()
        .isIn(['Standard', 'VIP', 'VVIP']).withMessage('Invalid ticket type'),
    body('dietaryRequirements')
        .optional()
        .isIn(['None', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free']).withMessage('Invalid dietary requirement'),
    body('referralSource')
        .optional()
        .isIn(['Social Media', 'Friend', 'Email', 'Website', 'Search Engine', 'Other']).withMessage('Invalid referral source'),
    body('agreeToTerms')
        .equals('true').withMessage('You must agree to the terms and conditions'),
    body('newsletter')
        .optional()
        .isBoolean().withMessage('Newsletter must be true or false'),
    handleValidationErrors
];

const eventValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Event name is required')
        .isLength({ max: 200 }).withMessage('Event name cannot exceed 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Event description is required')
        .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
    body('date')
        .notEmpty().withMessage('Event date is required')
        .isISO8601().withMessage('Invalid date format'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),
    body('venue')
        .trim()
        .notEmpty().withMessage('Venue is required'),
    body('capacity')
        .notEmpty().withMessage('Capacity is required')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('category')
        .optional()
        .isIn(['Tech', 'Business', 'Design', 'Marketing', 'Workshop', 'Conference', 'Networking', 'Other']),
    handleValidationErrors
];

module.exports = {
    registrationValidation,
    eventValidation,
    handleValidationErrors
};
