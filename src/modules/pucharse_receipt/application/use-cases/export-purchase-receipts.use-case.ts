import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PurchaseReceiptRepository } from '../../domain/repositories/purchase-receipt.repository';
import { FilterPurchaseReceiptDto } from '../dto/filter-purchase-receipt.dto';
import { Parser } from 'json2csv';

@Injectable()
export class ExportPurchaseReceiptsUseCase {
  constructor(
    @Inject('PurchaseReceiptRepository')
    private readonly repository: PurchaseReceiptRepository,
  ) {}

  async execute(filter: FilterPurchaseReceiptDto): Promise<string> {
  const receipts = await this.repository.findMany(filter);

  if (!receipts.length) {
    throw new BadRequestException('No hay comprobantes para exportar');
  }

  const transformed = receipts.map((receipt) => {
    const igv = +(receipt.amount * 0.18).toFixed(2);
    const total = +(receipt.amount + igv).toFixed(2);

    return {
      company_id: receipt.companyId,
      supplier_ruc: receipt.supplierRuc,
      invoice_number: receipt.invoiceNumber,
      amount: receipt.amount,
      igv,
      total,
      issue_date: receipt.issueDate.toISOString().split('T')[0],
      document_type: receipt.documentType,
      status: receipt.status,
    };
  });

  const parser = new Parser();
  return parser.parse(transformed);
}

}
