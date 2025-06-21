import { PurchaseReceipt } from '../../domain/entities/purchase-receipt.entity';
import { PurchaseReceiptRepository } from '../../domain/repositories/purchase-receipt.repository';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface RegisterPurchaseReceiptInput {
  companyId: string;
  supplierRuc: string;
  invoiceNumber: string;
  amount: number;
  issueDate: Date;
  documentType: string;
}

@Injectable()
export class RegisterPurchaseReceiptUseCase {
  constructor(private readonly repository: PurchaseReceiptRepository) {}

  async execute(input: RegisterPurchaseReceiptInput): Promise<PurchaseReceipt> {
    const exists = await this.repository.exists(input.invoiceNumber);
    if (exists) {
      throw new Error('Ya existe un comprobante con ese número de factura.');
    }

    const receipt = new PurchaseReceipt(
      randomUUID(),
      input.companyId,
      input.supplierRuc,
      input.invoiceNumber,
      input.amount,
      input.issueDate,
      input.documentType as any
    );

    return this.repository.create(receipt);
  }
}
