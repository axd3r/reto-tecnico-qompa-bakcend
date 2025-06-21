import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PurchaseReceiptRepository } from '../../domain/repositories/purchase-receipt.repository';
import { UpdatePurchaseReceiptStatusDto } from '../dto/update-purchase-receipt-status.dto';

@Injectable()
export class UpdatePurchaseReceiptStatusUseCase {
  constructor(
    @Inject('PurchaseReceiptRepository')
    private readonly repository: PurchaseReceiptRepository,
  ) {}

  async execute(id: string, dto: UpdatePurchaseReceiptStatusDto) {
    const receipt = await this.repository.findById(id);
    if (!receipt) throw new NotFoundException('Comprobante no encontrado');

    receipt.status = dto.status;
    return await this.repository.update(receipt);
  }
}
