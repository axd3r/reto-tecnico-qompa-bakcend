export enum DocumentType {
  FACTURA = 'FACTURA',
  BOLETA = 'BOLETA',
  RECIBO = 'RECIBO',
}

export enum PurchaseReceiptStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  OBSERVED = 'OBSERVED',
}

export class PurchaseReceipt {
  public readonly igv: number;
  public readonly total: number;
  public status: PurchaseReceiptStatus;

  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly supplierRuc: string,
    public readonly invoiceNumber: string,
    public readonly amount: number,
    public readonly issueDate: Date,
    public readonly documentType: DocumentType,
    status?: PurchaseReceiptStatus
  ) {
    this.igv = parseFloat((this.amount * 0.18).toFixed(2));
    this.total = parseFloat((this.amount + this.igv).toFixed(2));
    this.status = status ?? PurchaseReceiptStatus.PENDING;
  }
}
