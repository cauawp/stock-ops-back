import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendResetPasswordEmail(to: string, resetToken: string) {
    const resetUrl = `${this.configService.get<string>('RESET_PASSWORD_URL')}?token=${resetToken}`;
    const mailOptions = {
      from: `"Stock Ops" <cauawpvgsul@gmail.com>`,
      to,
      subject: 'Redefinição de senha',
      html: `<p>Para redefinir sua senha, clique no link abaixo:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Email enviado: %s', info.messageId);
  }
}
