import { IsEnum } from 'class-validator';
import { PurchaseReceiptStatus } from '../../domain/entities/purchase-receipt.entity';

export class UpdatePurchaseReceiptStatusDto {
  @IsEnum(PurchaseReceiptStatus)
  status: PurchaseReceiptStatus;
}
