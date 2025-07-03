import { Customer } from "@prisma/client";
import { CreateCustomerDto } from "../dtos/create-customer.dto";

export interface CustomerRepository {
  create(dto: CreateCustomerDto): Promise<Customer>;
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
}
