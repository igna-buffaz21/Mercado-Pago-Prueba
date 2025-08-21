import express from 'express'
import paymentRoutes from './routes/payment.routes.js';
import morgan from 'morgan';

const app = express()

app.use(morgan('dev'));

app.use(express.json()); // Necesario para recibir JSON en el webhook

app.use(paymentRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})