import { CreateCustomerDto } from "@/domain/dtos/create-customer.dto";
import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { Customer, PrismaClient } from "@prisma/client";

export class CustomerRepositoryImp implements CustomerRepository {
    private prisma = new PrismaClient();

    create(dto: CreateCustomerDto): Promise<Customer> {
        return this.prisma.customer.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash: dto.passwordHash,
            }
        });
    }

    findByEmail(email: string): Promise<Customer | null> {
        return this.prisma.customer.findUnique({
            where: { email }
        });
    }

    findById(id: string): Promise<Customer | null> {
        return this.prisma.customer.findUnique({
            where: { id }
        });
    }
}