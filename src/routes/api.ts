import  express  from "express";
import color from 'sscolors'

const router = express.Router();


router.get("/", (req, res) => {
    res.status(200).json({ status: 'OK' });
});



export default router;
