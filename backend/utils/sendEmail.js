import nodemailer  from 'nodemailer';
import ErrorResponse  from './errorResponse.js';

const sendEmail = async (options, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      PORT: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const message = {
      from: `${options.brand_name} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error, 'error sendong email');
    return next(new ErrorResponse('Error sending email', 500));
  }
};

export default sendEmail;
