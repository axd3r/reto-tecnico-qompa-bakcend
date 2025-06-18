// src/application/use-cases/create-purchase-receipt.use-case.ts

import { Injectable, Inject } from '@nestjs/common';
import { PurchaseReceiptRepository } from 'src/domain/repositories/purchase-receipt.repository';
import { CreatePurchaseReceiptDto } from '../dto/create-purchase-receipt.dto';
import { PurchaseReceipt } from 'src/domain/entities/purchase-receipt.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreatePurchaseReceiptUseCase {
  constructor(
    @Inject('PurchaseReceiptRepository')
    private readonly repository: PurchaseReceiptRepository,
  ) {}

  async execute(dto: CreatePurchaseReceiptDto): Promise<PurchaseReceipt> {
    const receipt = new PurchaseReceipt(
      randomUUID(),
      dto.companyId,
      dto.supplierRuc,
      dto.invoiceNumber,
      dto.amount,
      new Date(dto.issueDate),
      dto.documentType,
    );

    return await this.repository.create(receipt);
  }
}
