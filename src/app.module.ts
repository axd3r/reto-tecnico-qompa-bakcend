import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PucharseReceiptModule } from './modules/pucharse_receipt/infrastructure/controllers/pucharse-receipt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PucharseReceiptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
