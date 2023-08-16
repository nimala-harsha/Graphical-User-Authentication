import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMails = async (mail) => {
    try {
        const transporter = nodemailer.createTransport({
            name: 'AUTHENTICATION',
            host: 'mail.thaicoexport.com',
            port: 465,
            auth: {
                user: 'info@thaicoexport.com',
                pass: 'Thaico23#'
            },
            secure: true,
            requireTLS: true
        })

        const mailData = {
            from: '"Graphycal User Authentication" info@thaicoexport.com',
            to: mail.to,
            subject: mail.subject,
            text: mail.body,
            attachments: mail.attachments,
            html: mail.html,
        };

        transporter.sendMail(mailData, async (error, info) => {
            if (error) {
                console.log(error);
            } else if (info) {
                console.log(info);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
