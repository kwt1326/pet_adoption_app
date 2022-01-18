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
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { UpdateAdopteeUserInput, UpdateAdoptUserInput, UpdateUserInput } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(AdopteeUserRepository)
    private adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptUserRepository)
    private adoptUserRepository: AdoptUserRepository,

    private authService: AuthService,
  ) {}

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUserAccount(
    createAccountInput: CreateAccountUserInput
  ): Promise<User> {
    const { email, password, userType } = createAccountInput;
    const foundUserByEmail: User = await this.userRepository.findOneByEmail(
      email,
    );
    if (foundUserByEmail) {
      throw new ConflictException('Existing Email');
    }

    const hashedPassword = await this.hashingPassword(password);
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
      const createAccountUserInput: CreateAccountUserInput = {
        email, password, userType: UserType.ADOPTEE
      }
      const user: User = await this.createUserAccount(createAccountUserInput);
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
      const createAccountUserInput: CreateAccountUserInput = {
        email, password, userType: UserType.ADOPT
      }
      const user: User = await this.createUserAccount(createAccountUserInput);
      await this.adoptUserRepository.createAdoptUser(createAccountInput, user);
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

  async getOneAdopteeUser(id: number): Promise<AdopteeUser> {
    return this.adopteeUserRepository.getOneAdopteeUserById(id);
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]> {
    return this.adopteeUserRepository.getAllAdopteeUser();
  }

  async getOneAdoptUser(id: number): Promise<AdoptUser> {
    return this.adoptUserRepository.getOneAdoptUserById(id);
  }

  async getAllAdoptUser(): Promise<AdoptUser[]> {
    return this.adoptUserRepository.getAllAdoptUser();
  }

  async deleteOneUser(id: number) {
    const result = await this.userRepository.deleteOneUserById(id);
    console.log(result)
    return result.affected ? true : false;
  }

  async updateAdopteeUser(updateInput: UpdateAdopteeUserInput) {
    const { id, user: userInput, ...adopteeInput } = updateInput;
    const adopteeUser: AdopteeUser = await this.adopteeUserRepository.getOneAdopteeUserById(id);

    if (userInput?.password){
      userInput.password = await this.hashingPassword(userInput.password)
    }
    adopteeUser.user = { ...adopteeUser.user, ...userInput };
    const updatedUser: AdopteeUser = await this.adopteeUserRepository.save({...adopteeUser, ...adopteeInput});
    return updatedUser
  }

  async updateAdoptUser(updateInput: UpdateAdoptUserInput) {
    const { id, user: userInput, ...adoptInput } = updateInput;
    const adoptUser: AdoptUser = await this.adoptUserRepository.getOneAdoptUserById(id);

    if (userInput?.password){
      userInput.password = await this.hashingPassword(userInput.password)
    }
    adoptUser.user = { ...adoptUser.user, ...userInput };
    const updatedUser: AdoptUser = await this.adoptUserRepository.save({...adoptUser, ...adoptInput});
    return updatedUser
  }

  async findAdoptUser(user: User) {
    return await this.adoptUserRepository.findOne(user.id);
  }
  async findAdopteeUser(user: User) {
    return await this.adopteeUserRepository.findOne(user.id);
  }
}
