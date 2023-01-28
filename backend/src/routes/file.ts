import { Router } from "express";
import { file }  from "../controllers/file"
import passport from "passport";
import upload from "../middleware/upload";
const router = Router();

router.get('/upload', file.getAll);
router.post('/upload', upload.array('file'),  file.create);
router.delete('/upload:id', passport.authenticate('jwt', {session: false}), file.remove);

module.exports = router;

export default router;