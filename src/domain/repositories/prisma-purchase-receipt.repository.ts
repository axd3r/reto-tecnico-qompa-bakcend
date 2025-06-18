import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PurchaseReceiptRepository } from './purchase-receipt.repository';
import { PurchaseReceipt, DocumentType, PurchaseReceiptStatus } from 'src/domain/entities/purchase-receipt.entity';
import { Prisma } from 'generated/prisma';
import { FilterPurchaseReceiptDto } from 'src/application/dto/filter-purchase-receipt.dto';


@Injectable()
export class PrismaPurchaseReceiptRepository extends PurchaseReceiptRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(receipt: PurchaseReceipt): Promise<PurchaseReceipt> {
    const data: Prisma.PurchaseReceiptCreateInput = {
      id: receipt.id,
      companyId: receipt.companyId,
      supplierRuc: receipt.supplierRuc,
      invoiceNumber: receipt.invoiceNumber,
      amount: receipt.amount,
      issueDate: receipt.issueDate,
      documentType: receipt.documentType,
      status: receipt.status,
      igv: receipt.igv,
      total: receipt.total,
    };

    await this.prisma.purchaseReceipt.create({ data });
    return receipt;
  }

  async findById(id: string): Promise<PurchaseReceipt | null> {
    const receipt = await this.prisma.purchaseReceipt.findUnique({ where: { id } });
    if (!receipt) return null;

    return new PurchaseReceipt(
      receipt.id,
      receipt.companyId,
      receipt.supplierRuc,
      receipt.invoiceNumber,
      receipt.amount.toNumber(),
      receipt.issueDate,
      receipt.documentType as DocumentType,
      receipt.status as PurchaseReceiptStatus,
    );
  }

  async exists(invoiceNumber: string): Promise<boolean> {
    const receipt = await this.prisma.purchaseReceipt.findFirst({ where: { invoiceNumber } });
    return !!receipt;
  }

  async update(receipt: PurchaseReceipt): Promise<PurchaseReceipt> {
    await this.prisma.purchaseReceipt.update({
      where: { id: receipt.id },
      data: {
        status: receipt.status,
      },
    });

    return receipt;
  }

  async findAll(filter: FilterPurchaseReceiptDto) {
    const {
      startDate,
      endDate,
      documentType,
      status,
      page = 1,
      limit = 10,
    } = filter;

    const where: Prisma.PurchaseReceiptWhereInput = {};

    if (startDate && endDate) {
      where.issueDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (documentType) where.documentType = documentType;
    if (status) where.status = status;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.purchaseReceipt.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { issueDate: 'desc' },
      }),
      this.prisma.purchaseReceipt.count({ where }),
    ]);

    const mappedData = data.map((receipt) =>
      new PurchaseReceipt(
        receipt.id,
        receipt.companyId,
        receipt.supplierRuc,
        receipt.invoiceNumber,
        receipt.amount.toNumber(),
        receipt.issueDate,
        receipt.documentType as DocumentType,
        receipt.status as PurchaseReceiptStatus
      )
    );

    return {
      data: mappedData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findMany(filter: FilterPurchaseReceiptDto): Promise<PurchaseReceipt[]> {
    const {
      startDate,
      endDate,
      documentType,
      status,
    } = filter;

    const where: Prisma.PurchaseReceiptWhereInput = {};

    if (startDate && endDate) {
      where.issueDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (documentType) where.documentType = documentType;
    if (status) where.status = status;

    const receipts = await this.prisma.purchaseReceipt.findMany({
      where,
      orderBy: { issueDate: 'desc' },
    });

    return receipts.map(receipt =>
      new PurchaseReceipt(
        receipt.id,
        receipt.companyId,
        receipt.supplierRuc,
        receipt.invoiceNumber,
        receipt.amount.toNumber(),
        receipt.issueDate,
        receipt.documentType as DocumentType,
        receipt.status as PurchaseReceiptStatus,
      )
    );
  }
}
