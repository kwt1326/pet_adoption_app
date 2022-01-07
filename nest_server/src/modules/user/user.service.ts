import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
import {
  CreateAccountAdopteeUserInput,
  CreateAccountAdoptUserInput,
  CreateAccountOutput,
  CreateAccountUserInput,
} from './dtos/create-account.dto';
import {
  AdopteeUserRepository,
  AdoptUserRepository,
  UserRepository,
} from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(AdopteeUserRepository)
    private adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptUserRepository)
    private adoptUserRepository: AdoptUserRepository,

    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  async createUserAccount(
    createAccountInput:
      | CreateAccountAdoptUserInput
      | CreateAccountAdopteeUserInput,
    userType: UserType,
  ): Promise<User> {
    const { email, password } = createAccountInput;
    const foundUserByEmail: User = await this.userRepository.findOneByEmail(
      email,
    );
    if (foundUserByEmail) {
      throw new ConflictException('Existing Email');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUserInput: CreateAccountUserInput = {
      email,
      password: hashedPassword,
      userType,
    };

    return await this.userRepository.createUser(createUserInput);
  }

  async createAdopteeAccount(
    createAccountInput: CreateAccountAdopteeUserInput,
  ): Promise<CreateAccountOutput> {
    const result: CreateAccountOutput = {};
    try {
      const { email, password } = createAccountInput;
      const user: User = await this.createUserAccount(
        createAccountInput,
        UserType.ADOPTEE,
      );
      await this.adopteeUserRepository.createAdopteeUser(
        createAccountInput,
        user,
      );
      result.data = (
        await this.authService.login({ email, password })
      )?.result?.token;
    } catch (error) {
      result.error = {
        statusCode: error.response.statusCode,
        message: error.message,
      };
      console.error(error);
    }
    return result;
  }

  async createAdoptAccount(
    createAccountInput: CreateAccountAdoptUserInput,
  ): Promise<CreateAccountOutput> {
    const result: CreateAccountOutput = {};
    try {
      const { email, password } = createAccountInput;
      const user: User = await this.createUserAccount(
        createAccountInput,
        UserType.ADOPT,
      );
      await this.adoptUserRepository.createAdoptUser(createAccountInput, user);
      result.data = (
        await this.authService.login({ email, password })
      )?.result?.token;
    } catch (error) {
      console.error(error);
      result.error = {
        statusCode: error.response.statusCode,
        message: error.message,
      };
      console.error(error);
    }
    return result;
  }

  async findOne(id: number) {
    return await this.adoptUserRepository.findOne(id);
  }
}
