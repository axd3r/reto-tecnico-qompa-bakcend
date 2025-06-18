import { Injectable, Inject } from '@nestjs/common';
import { PurchaseReceiptRepository } from 'src/domain/repositories/purchase-receipt.repository';
import { FilterPurchaseReceiptDto } from '../dto/filter-purchase-receipt.dto';

@Injectable()
export class ListPurchaseReceiptsUseCase {
  constructor(
    @Inject('PurchaseReceiptRepository')
    private readonly repository: PurchaseReceiptRepository,
  ) {}

  async execute(filter: FilterPurchaseReceiptDto) {
    return await this.repository.findAll(filter);
  }
}
