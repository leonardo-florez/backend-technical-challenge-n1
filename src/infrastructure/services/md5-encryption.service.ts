import { createHash } from "crypto";
import { EncryptionService } from "@/domain/services/encryption.service";

export class Md5EncryptionService implements EncryptionService {
    async hashPassword(password: string): Promise<string> {
        return createHash('md5').update(password).digest('hex');
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const hashToCompare = await this.hashPassword(password);
        return hashToCompare === hashedPassword;
    }
}