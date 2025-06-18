import { IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { DocumentType } from 'src/domain/entities/purchase-receipt.entity';

export class CreatePurchaseReceiptDto {
  @IsString()
  companyId: string;

  @IsString()
  supplierRuc: string;

  @IsString()
  invoiceNumber: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  issueDate: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;
}
