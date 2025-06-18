import { IsString, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;
}
