
import { Product, Role, StockMovement, StockType } from '@prisma/client';

export class CreateSupplierDto {
  name: string;
  cnpj: string | null;
  address: string | null;
  products?: {
    name: string;
    barcode: string;
    imageUrl?: string;
    minQuantity: number;
  }[];
}
