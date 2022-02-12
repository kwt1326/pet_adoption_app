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

  async getAdopteeUserWithExceptionHandling(id: number): Promise<AdopteeUser> {
    const adopteeUser = await this.adopteeUserRepository.getOneAdopteeUserById(
      id,
    );
    if (!adopteeUser) {
      throw new BadRequestException(`id:${id}인 개인유저는 존재하지 않습니다.`);
    }
    return adopteeUser;
  }

  async getAdoptUserWithExceptionHandling(id: number): Promise<AdoptUser> {
    const adoptUser = await this.adoptUserRepository.getOneAdoptUserById(id);
    if (!adoptUser) {
      throw new BadRequestException(`id:${id}인 업체유저는 존재하지 않습니다.`);
    }
    return adoptUser;
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

  async getOneAdopteeUser(id: number): Promise<AdopteeUser> {
    return await this.getAdopteeUserWithExceptionHandling(id);
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]> {
    return await this.adopteeUserRepository.getAllAdopteeUser();
  }

  async getOneAdoptUser(id: number): Promise<AdoptUser> {
    return await this.getAdoptUserWithExceptionHandling(id);
  }

  async getAllAdoptUser(): Promise<AdoptUser[]> {
    return await this.adoptUserRepository.getAllAdoptUser();
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
