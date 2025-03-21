import express from 'express'
import Feedback from '../models/Feedback.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, feedback, rating } = req.body;
        
        if (!email || !feedback) {
            return res.status(400).json({
                success: false,
                message: 'Email and feedback message are required'
            });
        }

        const newFeedback = new Feedback({
            email,
            feedback,
            rating: rating || 0
        });

        await newFeedback.save();
        
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: {
                id: newFeedback._id,
                email: newFeedback.email,
                rating: newFeedback.rating
            }
        });
        
    } catch (error) {
        console.error('Feedback submission error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
})

export default router;