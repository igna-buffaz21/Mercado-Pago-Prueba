import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: 'TEST-6903777404502982-081515-937694d25552cc36ee14c041b108c5b1-2631965428' ///este accest-token tenes que cambiarlo por el tuyo
});

export const createOrder = async (req, res) => {
    try {
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        title: "Laptop",
                        unit_price: 400,
                        currency_id: "ARS",
                        quantity: 1
                    },
                    {
                        title: "Mouse",
                        unit_price: 20,
                        currency_id: "ARS",
                        quantity: 2
                    }
                ],
                back_urls: {
                    success: "https://0e7853dc2510.ngrok-free.app/success",
                    failure: "https://0e7853dc2510.ngrok-free.app/failure",
                    pending: "https://0e7853dc2510.ngrok-free.app/failure"
                },
                auto_return: "approved",
                notification_url: "https://0e7853dc2510.ngrok-free.app/webhook"
            }
        });

        res.json({
            message: "Orden creada",
            init_point: result.sandbox_init_point //sandbox
            // init_point: result.init_point //producción
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creando la orden",
            error: error.message,
            status: error.status
        });
    }
};


export const paymentSuccess = (req, res) => {
    res.send('¡Pago aprobado! 🎉');
};

export const paymentFailure = (req, res) => {
    res.send('Pago cancelado o pendiente ❌');
};

import { Payment } from 'mercadopago';

export const paymentWebhook = async (req, res) => {
    console.log('📢 Webhook recibido:', req.body);

    try {

        if (req.body.type === 'payment') {
            const paymentId = req.body.data.id;
            const payment = new Payment(client);

            const paymentInfo = await payment.get({ id: paymentId });

            console.log('💰 Estado del pago:', paymentInfo.status); 
            // Posibles valores: approved | in_process | rejected

            if (paymentInfo.status === 'approved') {
                console.log('✅ Pago acreditado correctamente');
            } else {
                console.log('⏳ Pago pendiente o rechazado');
            }
        }

        res.sendStatus(200);
        
    } catch (error) {
        console.error('❌ Error consultando el pago:', error);
        res.sendStatus(500);
    }
};

