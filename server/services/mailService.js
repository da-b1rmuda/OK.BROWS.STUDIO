import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendSuccessfulBooking(data) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.user_email,
      subject: "OK.BROWS",
      text: "",
      html: `
            <div>
              <h1>Вы успешно записались</h1>
              <p>Дата записи: ${
                data.appointment_date.toISOString().split("T")[0]
              }</p>
              <p>Время: ${data.appointment_time}</p>
              <p>Услуга: ${
                data.service_name.charAt(0).toUpperCase() +
                data.service_name.slice(1)
              }</p>
              <p>Цена: ${data.price} руб.</p>
            </div>
          `,
    });
  }
  async sendChangeBooking(data) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.user_email,
      subject: "OK.BROWS",
      text: "",
      html: `
            <div>
              <h1>Приношу извинения, ваша запись была изменена!</h1>
              <p>Новая инфомрация о вашей записи:</p>
              <p>Дата записи: ${
                data.appointment_date.toISOString().split("T")[0]
              }</p>
              <p>Время: ${data.appointment_time}</p>
              <p>Услуга: ${
                data.service_name.charAt(0).toUpperCase() +
                data.service_name.slice(1)
              }</p>
              <p>Цена: ${data.price} руб.</p>
            </div>
          `,
    });
  }
  async sendDeleteBooking(to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "OK.BROWS",
      text: "",
      html: `
            <div>
              <h1>Приношу извинения, ваша запись была откланена!</h1>
            </div>
          `,
    });
  }
}

export default MailService;
