const nodemailer = require('nodemailer');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'classpip@gmail.com', // Cambialo por tu email
        pass: 'Classpip@2016' // Cambialo por tu password


    }
    });
    const mailOptions = {
        from: `”${formulario.nombre} 👻” <${formulario.email}>`,
        to: 'miguel.valero@upc.edu', // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
        <strong>Nombre:</strong> ${formulario.nombre} <br/>
        <strong>E-mail:</strong> ${formulario.email} <br/>
        <strong>Mensaje:</strong> ${formulario.mensaje}
        `
    };
    const mailOptions2 = {
        from: `Classpip`,
        to: 'miguel.valero@upc.edu', // Cambia esta parte por el destinatario
        subject: `contraseña`,
        html: `Este es el mensaje ñ`
    };
    transporter.sendMail(mailOptions2, function (err, info) {
        if (err)
        console.log(err)
        else
        console.log(info);
    });
}