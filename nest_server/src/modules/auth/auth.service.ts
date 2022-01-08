import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/user.repository';
import { LoginInput } from './dtos/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(
    loginInput: LoginInput,
  ): Promise<String> {
    const { email, password } = loginInput;
    const user: User = await this.userRepository.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { userType, isAvailable } = user;
      const payload = { email, userType, isAvailable };
      const accessToken = await this.jwtService.sign(payload);

      return accessToken;
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }
}
