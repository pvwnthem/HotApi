import  express  from "express";
import color from 'sscolors'

const router = express.Router();


router.get("/", (req, res) => {
    res.send("Hello World!");
});



export default router;
