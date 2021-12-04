
import * as nodemailer from "nodemailer";

export class EnviarEmailService {
    public EnviarEmail() {
        const transporter = nodemailer.createTransport({
            auth: {
                user: 'classpipupc@gmail.com', // Cambialo por tu email
                pass: 'mimara00.' // Cambialo por tu password
            },
            service: "gmail",
        });
        const mailOptions = {
            from: "classpip",
            to: "miguel.valero@upc.edu", // Cambia esta parte por el destinatario
            subject: "tu contraseña",
            html: " Tu contraseña en classpip es esta XXXX",
        };
        // tslint:disable-next-line:only-arrow-functions
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }
}