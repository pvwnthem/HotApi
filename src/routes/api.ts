import  express  from "express";
import { MongoClient, Db } from 'mongodb';

const mongo = new MongoClient('mongodb://localhost:27017');
const db: Db = mongo.db('test');

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
    await mongo.connect();
        const car = (await db.collections()).forEach(async (collection) => {
            const col = db.collection(collection.collectionName);
            const car = await col.findOne({ "Toy #": req.params.id });
            if (car) {
                
                res.json(car)
            }
            else {
                res.status(404).json({ message: 'Car not found' });
            }

        })
    
    
});

export default router;
