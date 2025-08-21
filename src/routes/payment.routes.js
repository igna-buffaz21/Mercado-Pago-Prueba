import { Router } from "express";
import { createOrder, paymentSuccess, paymentFailure, paymentWebhook } from "../controllers/payment.controller.js";

const router = Router();

router.get('/create-order', createOrder);
router.get('/success', paymentSuccess);
router.get('/failure', paymentFailure);
router.post('/webhook', paymentWebhook);

export default router;