import { PurchaseRepository } from "@/domain/repositories/purchase.repository";
import { Purchase } from "@prisma/client";

export class PurchaseRepositoryImp implements PurchaseRepository {
    create(customerId: string): Promise<Purchase> {
        throw new Error("Method not implemented.");
    }
    getLast(customerId: string): Promise<Purchase | null> {
        throw new Error("Method not implemented.");
    }
}