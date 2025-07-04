import { Purchase } from "@prisma/client";

export interface PurchaseRepository {
  create(customerId: string): Promise<Purchase>;
  getLast(customerId: string): Promise<Purchase | null>;
  findByCustomerId(customerId: string): Promise<Purchase[]>;
}
