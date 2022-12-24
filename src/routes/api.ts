import  express  from "express";
import color from 'sscolors'

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


export default router;
