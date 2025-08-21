Para hacerlo funcionar tenes que:
1) ir a https://www.mercadopago.com.ar/developers/es
2) ir a tus integraciones
3) crear una nueva integracion
4) ir a cuentas de prueba, agarras uno que sea Vendedor
5) agarras el nombre de usuario y contraseña, te vas a incognito, abris mercado pago developers, entras con el usuario y contraseña de ese usuario de prueba
6) creas una nueva integracion, ahi vas a credenciales de prueba y copias el access-token y lo pegas en el codigo donde dice access-token, en payment.controller.js

Una vez hayas hecho eso, tenes que descargarte ngrok

ahora tenes que: 
1) poner en marcha la app, consola, node index.js, ahi se te inicia en el puerto 3000
2) ahora abris ngrok y pones en la consola: ngrok http 3000, con ese comando te va a dar una url publica de ngrok del back
3) copias la url, y la remplazas aca:

    back_urls: {
                    success: "https://0e7853dc2510.ngrok-free.app/success", ////aca
                    failure: "https://0e7853dc2510.ngrok-free.app/failure", ////aca
                    pending: "https://0e7853dc2510.ngrok-free.app/failure" ////aca
                },
                auto_return: "approved",
                notification_url: "https://0e7853dc2510.ngrok-free.app/webhook" ////aca
4) una vez hecho todo entras a la url publica que te dio ngrok y vas a esta ruta: /create-order, ahi se te crea la orden de lo que vas a comprar, y ahi te da un init point, ese init point, es la url que te redirige a mp para pagar
5) una vez entres a ese init point, tenes que iniciar sesion en mp con una cuenta de prueba que sea del tipo Comprador, ahi ya vas a poder pagar
6) y con una extension que te descargaste que es morgan, te va tirando todas las peticiones en la consola
7) y ahi estan las hooks, que van indicando el estado del pago
