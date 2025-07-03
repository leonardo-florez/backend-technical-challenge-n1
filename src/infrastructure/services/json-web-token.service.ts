import { Envs } from '@/core/config/envs';
import { JwtService } from '@/domain/services/jwt.service';
import jwt, { SignOptions } from 'jsonwebtoken';

export class JsonWebTokenService implements JwtService {
    generateToken(payload: any): string {
        return jwt.sign(
            payload,
            Envs.jwtSecret,
            {
                expiresIn: Envs.jwtExpiresIn,
            } as SignOptions
        );
    }

    verifyToken(token: string): any {
        return jwt.verify(token, Envs.jwtSecret);

    }

    decodeToken(token: string): any {
        return jwt.decode(token);
    }
}
