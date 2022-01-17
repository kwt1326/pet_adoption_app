import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Payload } from './auth.interface';

@Injectable()
export class JwtService {
  sign(payload: Payload): string {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
