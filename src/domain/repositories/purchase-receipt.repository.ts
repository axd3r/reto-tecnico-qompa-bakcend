import { FilterPurchaseReceiptDto } from "src/application/dto/filter-purchase-receipt.dto";
import { PurchaseReceipt } from "../entities/purchase-receipt.entity";

export abstract class PurchaseReceiptRepository {
  abstract create(receipt: PurchaseReceipt): Promise<PurchaseReceipt>;
  abstract findById(id: string): Promise<PurchaseReceipt | null>;
  abstract exists(invoiceNumber: string): Promise<boolean>;
  abstract update(receipt: PurchaseReceipt): Promise<PurchaseReceipt>;
  abstract findAll(filter: FilterPurchaseReceiptDto): Promise<{
    data: PurchaseReceipt[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  abstract findMany(filter: FilterPurchaseReceiptDto): Promise<PurchaseReceipt[]>;

}
