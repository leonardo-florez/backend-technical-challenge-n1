import { PurchaseRepository } from "@/domain/repositories/purchase.repository";
import { PrismaClient, Purchase } from "@prisma/client";

export class PurchaseRepositoryImp implements PurchaseRepository {
    private prisma = new PrismaClient();

    create(customerId: string): Promise<Purchase> {
        return this.prisma.purchase.create({
            data: {
                customerId,
            }
        });
    }

    getLast(customerId: string): Promise<Purchase | null> {
        return this.prisma.purchase.findFirst({
            where: { customerId },
            orderBy: { purchasedAt: 'desc' },
            take: 1
        });
    }
}