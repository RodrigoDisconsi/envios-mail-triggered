const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');


const app = express();

app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
    try{
        const { aceptado, nombreUsuario, mail } = req.body;

        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'Grupotriggered@gmail.com',
                pass: 'cpigwsdltcbplbzu',
            },
        });

        const result = await transporter.sendMail({
            from: '"Triggered" <Grupotriggered@gmail.com>',
            to: mail,
            subject: aceptado ? 'Su cuenta fue aceptada!' : 'Disculpe pero usted no ha sido aceptado.',
            html: `
            <h1>${aceptado ? 'Felicitaciones' : 'Disculpe'} ${nombreUsuario}</h1>
            <p> Su cuenta fue ${aceptado ? 'aceptada' : 'rechazada'}</p>
            <p>Saludos Triggered</p>
            `,
        });
        res.json({...result, seEnvio: true});
    }
    catch(e) {
        console.log(e);
        res.json({mensaje: 'No se pudo enviar el mail', seEnvio: false});
    }
});

app.listen(process.env.PORT || 3000, () => console.log('APP LISTA'));
