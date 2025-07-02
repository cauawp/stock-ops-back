// keep-alive.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cron from 'node-cron';
import fetch from 'node-fetch';

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('KEEP_ALIVE_URL');

    if (!url) {
      this.logger.warn('KEEP_ALIVE_URL não está definida no .env');
      return;
    }

    cron.schedule('*/30 * * * *', async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          this.logger.log(`Ping bem-sucedido para ${url}`);
        } else {
          this.logger.warn(`Ping falhou com status ${response.status} para ${url}`);
        }
      } catch (error) {
        this.logger.error(`Erro ao tentar pingar ${url}:`, error);
      }
    });
  }
}
