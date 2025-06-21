import { Module } from '@nestjs/common';
import { PurchaseReceiptController } from './purchase-receipt.controller';
import { CreatePurchaseReceiptUseCase } from '../../application/use-cases/create-purchase-receipt.use-case';
import { PrismaPurchaseReceiptRepository } from '../../domain/repositories/prisma-purchase-receipt.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePurchaseReceiptStatusUseCase } from '../../application/use-cases/update-purchase-receipt-status.use-case';
import { ListPurchaseReceiptsUseCase } from '../../application/use-cases/list-purchase-receipts.use-case';
import { ExportPurchaseReceiptsUseCase } from '../../application/use-cases/export-purchase-receipts.use-case';
import { AskAIUseCase } from '../../application/use-cases/ask-ai.use-case';
import { InfrastructureModule } from '../infrastructure.module';

@Module({
  imports: [InfrastructureModule],
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
export class PucharseReceiptModule {}