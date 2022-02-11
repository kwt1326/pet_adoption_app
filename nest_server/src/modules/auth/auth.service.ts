import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
  UserRepository,
} from 'src/modules/user/user.repository';
import { JwtService } from './jwt.service';
import { LoginInput } from './dtos/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { User, UserType } from 'src/entities/user.entity';
import {
  RequestOutput,
  RequestOutputObj,
} from '../common/dtos/request-result.dto';
import { Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(AdopteeUserRepository)
    private adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptUserRepository)
    private adoptUserRepository: AdoptUserRepository,

    private jwtService: JwtService,
  ) {}

  async login(
    loginInput: LoginInput,
  ): Promise<RequestOutput<{ token: string }>> {
    const { email, password } = loginInput;
    const user: User = await this.userRepository.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, userType, isAvailable } = user;
      console.log(user.userType === UserType.ADOPTEE);
      const { nickname } =
        user.userType === UserType.ADOPTEE
          ? await this.adopteeUserRepository.getOneAdopteeUserById(id)
          : await this.adoptUserRepository.getOneAdoptUserById(id);
      console.log(nickname);
      const payload: Payload = { id, email, userType, nickname, isAvailable };
      const accessToken = await this.jwtService.sign(payload);

      return RequestOutputObj({ token: accessToken }, 200);
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }
}
