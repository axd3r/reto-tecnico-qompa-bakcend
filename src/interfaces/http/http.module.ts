import { Module } from '@nestjs/common';
import { PurchaseReceiptController } from './controllers/purchase-receipt.controller';
import { CreatePurchaseReceiptUseCase } from 'src/application/use-cases/create-purchase-receipt.use-case';
import { PrismaPurchaseReceiptRepository } from 'src/domain/repositories/prisma-purchase-receipt.repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UpdatePurchaseReceiptStatusUseCase } from 'src/application/use-cases/update-purchase-receipt-status.use-case';
import { ListPurchaseReceiptsUseCase } from 'src/application/use-cases/list-purchase-receipts.use-case';
import { ExportPurchaseReceiptsUseCase } from 'src/application/use-cases/export-purchase-receipts.use-case';
import { AskAIUseCase } from 'src/application/use-cases/ask-ai.use-case';

@Module({
  controllers: [PurchaseReceiptController],
  providers: [
    CreatePurchaseReceiptUseCase,
    UpdatePurchaseReceiptStatusUseCase,
    ListPurchaseReceiptsUseCase,
    ExportPurchaseReceiptsUseCase,
    AskAIUseCase,
    PrismaService,
    {
      provide: 'PurchaseReceiptRepository',
      useClass: PrismaPurchaseReceiptRepository,
    },
  ],
})
export class HttpModule {}