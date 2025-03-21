import express from 'express'
import Fschema from '../models/Fschema.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const feed = await Fschema.create({
            email: req.body.email,
            feedback: req.body.feedback
        });
        res.json({ feed });
    }
    catch (error) {
        console.log("error", error.message);
        res.status(500).json({ error: error.message });
    }
})

export default router;