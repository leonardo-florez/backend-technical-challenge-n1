import { CreateCustomerDto } from "@/domain/dtos/create-customer.dto";
import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { Customer } from "@prisma/client";

export class CustomerRepositoryImp implements CustomerRepository {
    create(dto: CreateCustomerDto): Promise<Customer> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<Customer | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Customer | null> {
        throw new Error("Method not implemented.");
    }
}