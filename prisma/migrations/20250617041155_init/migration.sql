-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('FACTURA', 'BOLETA', 'RECIBO');

-- CreateEnum
CREATE TYPE "PurchaseReceiptStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED', 'OBSERVED');

-- CreateTable
CREATE TABLE "PurchaseReceipt" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "supplierRuc" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "status" "PurchaseReceiptStatus" NOT NULL DEFAULT 'PENDING',
    "igv" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseReceipt_pkey" PRIMARY KEY ("id")
);
