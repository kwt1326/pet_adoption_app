import { BadRequestException, Injectable } from '@nestjs/common';
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
import {
  UpdateAdopteeUserInput,
  UpdateAdoptUserInput,
} from './dtos/update-user.dto';
import { DeleteRequestOutput } from '../common/dtos/request-result.dto';
import {
  CheckDuplicateFieldInput,
  CheckDuplicateFieldOutput,
} from './dtos/check-duplicate-field.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(AdopteeUserRepository)
    private readonly adopteeUserRepository: AdopteeUserRepository,

    @InjectRepository(AdoptUserRepository)
    private readonly adoptUserRepository: AdoptUserRepository,

    private readonly authService: AuthService,
  ) {}

  async checkDuplicateEmail(email: string): Promise<boolean> {
    const isDup: boolean = (await this.userRepository.findOneByEmail(email))
      ? true
      : false;
    return isDup;
  }

  async checkDuplicateNickname(nickname: string): Promise<boolean> {
    const isDup: boolean =
      (await this.adoptUserRepository.findOneAdoptUserByNickname(nickname)) ||
      (await this.adopteeUserRepository.findOneAdopteeUserByNickname(nickname))
        ? true
        : false;
    return isDup;
  }

  async checkDuplicateField(
    checkFieldInput: CheckDuplicateFieldInput,
  ): Promise<CheckDuplicateFieldOutput> {
    const { email, nickname } = checkFieldInput;
    const resOutput: CheckDuplicateFieldOutput = {
      result: false,
    };
    if (email) resOutput.result = await this.checkDuplicateEmail(email);
    if (nickname)
      resOutput.result = await this.checkDuplicateNickname(nickname);
    return resOutput;
  }

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUserAccount(
    createAccountInput: CreateAccountUserInput,
  ): Promise<User> {
    const { email, nickname, password, userType } = createAccountInput;
    const resultOfCheckDup = await this.checkDuplicateField({
      email,
      nickname,
    });
    if (resultOfCheckDup.result) {
      throw new BadRequestException('Please do a duplicate test.');
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
    const createAccountUserInput: CreateAccountUserInput = {
      ...createAccountInput,
      userType: UserType.ADOPTEE,
    };
    const user: User = await this.createUserAccount(createAccountUserInput);
    await this.adopteeUserRepository.createAdopteeUser(
      createAccountInput,
      user,
    );
    const { email, password } = createAccountInput;
    const token = (await this.authService.login({ email, password }))?.result
      ?.token;
    return { token };
  }

  async createAdoptAccount(
    createAccountInput: CreateAccountAdoptUserInput,
  ): Promise<CreateAccountOutput> {
    const createAccountUserInput: CreateAccountUserInput = {
      ...createAccountInput,
      userType: UserType.ADOPT,
    };
    const user: User = await this.createUserAccount(createAccountUserInput);
    await this.adoptUserRepository.createAdoptUser(createAccountInput, user);
    const { email, password } = createAccountInput;
    const token = (await this.authService.login({ email, password }))?.result
      ?.token;
    return { token };
  }

  async getOneAdopteeUser(id: number): Promise<AdopteeUser> {
    return await this.adopteeUserRepository.getOneAdopteeUserById(id);
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]> {
    return await this.adopteeUserRepository.getAllAdopteeUser();
  }

  async getOneAdoptUser(id: number): Promise<AdoptUser> {
    return await this.adoptUserRepository.getOneAdoptUserById(id);
  }

  async getAllAdoptUser(): Promise<AdoptUser[]> {
    return await this.adoptUserRepository.getAllAdoptUser();
  }

  async deleteOneUser(id: number) {
    const deleteResult: DeleteRequestOutput = {
      result: (await this.userRepository.deleteOneUserById(id)).affected,
    };
    if (deleteResult.result === 0) {
      throw new BadRequestException(`There is no user with id of ${id}`);
    }
    return deleteResult;
  }

  async updateAdopteeUser(updateInput: UpdateAdopteeUserInput) {
    const { id, user: userInput, ...adopteeInput } = updateInput;
    const adopteeUser: AdopteeUser =
      await this.adopteeUserRepository.getOneAdopteeUserById(id);

    if (userInput?.password) {
      userInput.password = await this.hashingPassword(userInput.password);
    }
    adopteeUser.user = { ...adopteeUser.user, ...userInput };
    const updatedUser: AdopteeUser = await this.adopteeUserRepository.save({
      ...adopteeUser,
      ...adopteeInput,
    });
    return updatedUser;
  }

  async updateAdoptUser(updateInput: UpdateAdoptUserInput) {
    const { id, user: userInput, ...adoptInput } = updateInput;
    const adoptUser: AdoptUser =
      await this.adoptUserRepository.getOneAdoptUserById(id);

    if (userInput?.password) {
      userInput.password = await this.hashingPassword(userInput.password);
    }
    adoptUser.user = { ...adoptUser.user, ...userInput };
    const updatedUser: AdoptUser = await this.adoptUserRepository.save({
      ...adoptUser,
      ...adoptInput,
    });
    return updatedUser;
  }

  async findAdoptUser(user: User) {
    return await this.adoptUserRepository.findOne(user.id);
  }
  async findAdopteeUser(user: User) {
    return await this.adopteeUserRepository.findOne(user.id);
  }
}
