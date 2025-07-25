import  express from "express";
const router = express.Router();
import { Auth } from "../controllers";

router.post("/login", Auth.login);
router.post("/signup", Auth.signup);
router.post("/me", Auth.isUserAuthenticated);

export default router;