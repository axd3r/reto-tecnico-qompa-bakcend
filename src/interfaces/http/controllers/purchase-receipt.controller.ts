import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CreatePurchaseReceiptDto } from 'src/application/dto/create-purchase-receipt.dto';
import { FilterPurchaseReceiptDto } from 'src/application/dto/filter-purchase-receipt.dto';
import { UpdatePurchaseReceiptStatusDto } from 'src/application/dto/update-purchase-receipt-status.dto';
import { CreatePurchaseReceiptUseCase } from 'src/application/use-cases/create-purchase-receipt.use-case';
import { ExportPurchaseReceiptsUseCase } from 'src/application/use-cases/export-purchase-receipts.use-case';
import { ListPurchaseReceiptsUseCase } from 'src/application/use-cases/list-purchase-receipts.use-case';
import { UpdatePurchaseReceiptStatusUseCase } from 'src/application/use-cases/update-purchase-receipt-status.use-case';
import { PurchaseReceipt } from 'src/domain/entities/purchase-receipt.entity';
import { Response } from 'express';
import { AskAIUseCase } from 'src/application/use-cases/ask-ai.use-case';
import { AskAIDto } from 'src/application/dto/ask-ai.dto';

@Controller('purchase-receipts')
export class PurchaseReceiptController {
  constructor(
    private readonly createUseCase: CreatePurchaseReceiptUseCase,
    private readonly updateStatusUseCase: UpdatePurchaseReceiptStatusUseCase,
    private readonly listUseCase: ListPurchaseReceiptsUseCase,
    private readonly exportUseCase: ExportPurchaseReceiptsUseCase,
    private readonly askAiUseCase: AskAIUseCase

  ) { }

  @Post()
  async create(@Body() dto: CreatePurchaseReceiptDto): Promise<PurchaseReceipt> {
    return this.createUseCase.execute(dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePurchaseReceiptStatusDto,
  ) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  @Get()
  async findAll(@Query() filter: FilterPurchaseReceiptDto) {
    return this.listUseCase.execute(filter);
  }

  @Get('export')
  async export(
    @Query() filter: FilterPurchaseReceiptDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const csv = await this.exportUseCase.execute(filter);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=receipts.csv');
    res.status(200).send(csv);
  }

  @Post('ai/ask')
  async ask(@Body() dto: AskAIDto) {
    return this.askAiUseCase.execute(dto.question);
  }
}