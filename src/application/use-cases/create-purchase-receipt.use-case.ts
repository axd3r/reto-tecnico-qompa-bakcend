import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { PurchaseReceiptRepository } from 'src/domain/repositories/purchase-receipt.repository';
import { CreatePurchaseReceiptDto } from '../dto/create-purchase-receipt.dto';
import { PurchaseReceipt } from 'src/domain/entities/purchase-receipt.entity';
import { randomUUID } from 'crypto';
import { SunatService } from 'src/infrastructure/services/sunat.service';

@Injectable()
export class CreatePurchaseReceiptUseCase {
  constructor(
    @Inject('PurchaseReceiptRepository')
    private readonly repository: PurchaseReceiptRepository,
    private readonly sunatService: SunatService,
  ) { }

  async execute(dto: CreatePurchaseReceiptDto): Promise<PurchaseReceipt> {
    const alreadyExists = await this.repository.existsByInvoiceAndRuc(dto.invoiceNumber, dto.supplierRuc);
    if (alreadyExists) {
      throw new BadRequestException('Ya existe un comprobante con ese número y RUC');
    }

    const issueDate = dto.issueDate ? new Date(dto.issueDate) : new Date();
    const today = new Date();

    if (issueDate > today) {
      throw new BadRequestException('La fecha de emisión no puede ser futura');
    }

    if (issueDate.getFullYear() < 2000) {
      throw new BadRequestException('La fecha de emisión es demasiado antigua');
    }

    await this.sunatService.validateRuc(dto.supplierRuc);

    const receipt = new PurchaseReceipt(
      randomUUID(),
      dto.companyId,
      dto.supplierRuc,
      dto.invoiceNumber,
      dto.amount,
      issueDate,
      dto.documentType,
    );

    return await this.repository.create(receipt);
  }
}
