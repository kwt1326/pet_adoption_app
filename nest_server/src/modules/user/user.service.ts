import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
import {
  CreateAccountAdopteeUserInput,
  CreateAccountAdoptUserInput,
  CreateAccountOutput,
  CreateAccountUserInput,
  LoginInput,
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
import { GetAdoptUsersArgs } from './dtos/get-adopt-users.dto';

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

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUserAccount(
    createAccountInput: CreateAccountUserInput,
  ): Promise<User> {
    const { email, nickname, password, userType } = createAccountInput;
    await this.exceptionHandlingForDuplicateField({ email, nickname });
    const user = await this.userRepository.createUser({
      email,
      password: await this.hashingPassword(password),
      userType,
    });
    return user;
  }

  async exceptionHandlingForDuplicateField(
    checkFieldInput: CheckDuplicateFieldInput,
  ) {
    const resultOfCheckDup = await this.checkDuplicateField(checkFieldInput);
    if (resultOfCheckDup.result) {
      throw new BadRequestException('Please do a duplicate test.');
    }
  }

  async checkDuplicateField(
    checkFieldInput: CheckDuplicateFieldInput,
  ): Promise<CheckDuplicateFieldOutput> {
    const { email, nickname } = checkFieldInput;
    const resOutput: CheckDuplicateFieldOutput = {
      result: false,
    };
    if (email) {
      resOutput.result = await this.checkDuplicateEmail(email);
    }
    if (nickname && !resOutput.result) {
      resOutput.result = await this.checkDuplicateNickname(nickname);
    }
    return resOutput;
  }

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

  async createAdopteeAccount(
    createAccountInput: CreateAccountAdopteeUserInput,
  ): Promise<CreateAccountOutput> {
    const user: User = await this.createAndGetUser({
      ...createAccountInput,
      userType: UserType.ADOPTEE,
    });
    await this.adopteeUserRepository.createAndSaveAdopteeUser(
      createAccountInput,
      user,
    );
    const { email, password } = createAccountInput;
    const token = await this.getAccessToken({ email, password });
    return { token };
  }

  async createAdoptAccount(
    createAccountInput: CreateAccountAdoptUserInput,
  ): Promise<CreateAccountOutput> {
    const user: User = await this.createAndGetUser({
      ...createAccountInput,
      userType: UserType.ADOPT,
    });
    await this.adoptUserRepository.createAndSaveAdoptUser(
      createAccountInput,
      user,
    );
    const { email, password } = createAccountInput;
    const token = await this.getAccessToken({ email, password });
    return { token };
  }

  async createAndGetUser(
    createAccountUserInput: CreateAccountUserInput,
  ): Promise<User> {
    return await this.createUserAccount(createAccountUserInput);
  }

  async getAccessToken(loginInput: LoginInput): Promise<string> {
    return (await this.authService.login(loginInput))?.result?.token;
  }

  async getOneAdopteeUser(id: number): Promise<AdopteeUser> {
    return await this.getAdopteeUserWithExceptionHandling(id);
  }

  async getAdopteeUserWithExceptionHandling(id: number): Promise<AdopteeUser> {
    const adopteeUser = await this.adopteeUserRepository.getOneAdopteeUserById(
      id,
    );
    if (!adopteeUser) {
      throw new BadRequestException(`id:${id}인 개인유저는 존재하지 않습니다.`);
    }
    return adopteeUser;
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]> {
    return await this.adopteeUserRepository.getAllAdopteeUser();
  }

  async getOneAdoptUser(id: number): Promise<AdoptUser> {
    return await this.getAdoptUserWithExceptionHandling(id);
  }

  async getAdoptUserWithExceptionHandling(id: number): Promise<AdoptUser> {
    const adoptUser = await this.adoptUserRepository.getOneAdoptUserById(id);
    if (!adoptUser) {
      throw new BadRequestException(`id:${id}인 업체유저는 존재하지 않습니다.`);
    }
    return adoptUser;
  }

  async getAuthenticatedAdoptUsers(
    getAdoptUsersArgs: GetAdoptUsersArgs,
  ): Promise<AdoptUser[]> {
    return await this.adoptUserRepository.getAuthenticatedAdoptUsers(
      getAdoptUsersArgs,
    );
  }

  async deleteOneUser(id: number, user: User) {
    user.userType === UserType.ADOPTEE
      ? await this.getAdopteeUserWithVerifyingAuthority(id, user)
      : await this.getAdoptUserWithVerifyingAuthority(id, user);
    const deleteResult: DeleteRequestOutput = {
      result: (await this.userRepository.deleteOneUserById(id)).affected,
    };
    return deleteResult;
  }

  async getAdopteeUserWithVerifyingAuthority(
    targetId: number,
    user: User,
  ): Promise<AdopteeUser> {
    const targetUser = await this.getAdopteeUserWithExceptionHandling(targetId);
    if (targetUser.userId !== user.id) {
      throw new UnauthorizedException('해당 요청에 대한 권한이 없습니다.');
    }
    return targetUser;
  }

  async getAdoptUserWithVerifyingAuthority(
    targetId: number,
    user: User,
  ): Promise<AdoptUser> {
    const targetUser = await this.getAdoptUserWithExceptionHandling(targetId);
    if (targetUser.userId !== user.id) {
      throw new UnauthorizedException('해당 요청에 대한 권한이 없습니다.');
    }
    return targetUser;
  }

  async updateAdopteeUser(updateInput: UpdateAdopteeUserInput, user: User) {
    const { id } = updateInput;
    const adopteeUser: AdopteeUser =
      await this.getAdopteeUserWithVerifyingAuthority(id, user);

    if (updateInput.user?.password) {
      updateInput.user.password = await this.hashingPassword(
        updateInput.user.password,
      );
    }
    if (
      updateInput?.nickname &&
      (await this.checkDuplicateNickname(updateInput?.nickname))
    ) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }
    return this.adopteeUserRepository.updateAdopteeUser(
      adopteeUser,
      updateInput,
    );
  }

  async updateAdoptUser(updateInput: UpdateAdoptUserInput, user: User) {
    const { id } = updateInput;
    const adoptUser: AdoptUser = await this.getAdoptUserWithVerifyingAuthority(
      id,
      user,
    );

    if (updateInput.user?.password) {
      updateInput.user.password = await this.hashingPassword(
        updateInput.user.password,
      );
    }
    if (
      updateInput?.nickname &&
      (await this.checkDuplicateNickname(updateInput?.nickname))
    ) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }
    return this.adoptUserRepository.updateAdoptUser(adoptUser, updateInput);
  }

  async findAdoptUser(user: User) {
    return await this.adoptUserRepository.findOne(user.id);
  }
  async findAdopteeUser(user: User) {
    return await this.adopteeUserRepository.findOne(user.id);
  }
}
