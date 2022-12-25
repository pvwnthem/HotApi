import  express  from "express";
import { MongoClient, Db } from 'mongodb';

const mongo = new MongoClient('mongodb://localhost:27017');
const db: Db = mongo.db('full');

const router = express.Router();





router.get("/", (req, res) => {
    res.status(200).json({ status: 'OK' });
});



router.get('/health', async (_req, res, _next) => {

    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});


// route to get a car by id regardless of year

router.get('/car/:id', async (req, res, _next) => {
    console.log(req.params.id, "hit")
    let payload = [];
    await mongo.connect();

    const collection = db.collection('cars');

    await collection.find({ id: req.params.id }).forEach((doc) => {
        
        payload.push(doc);
    });
    if (payload.length === 0) {
        res.status(404).json({ message: 'Not found' });
    } else {
        res.status(200).json(payload);
    }

   
    
});

export default router;
