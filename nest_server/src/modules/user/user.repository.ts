import { BadRequestException } from '@nestjs/common';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import {
  CreateAccountAdopteeUserInput,
  CreateAccountAdoptUserInput,
  CreateAccountUserInput,
} from './dtos/create-account.dto';
import { GetAdoptUsersArgs } from './dtos/get-adopt-users.dto';
import {
  UpdateAdopteeUserInput,
  UpdateAdoptUserInput,
} from './dtos/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async createUser(createAccountInput: CreateAccountUserInput): Promise<User> {
    const user = await this.create({ ...createAccountInput });
    return await this.save(user);
  }

  async deleteOneUserById(id: number) {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
    return result;
  }
}

@EntityRepository(AdopteeUser)
export class AdopteeUserRepository extends Repository<AdopteeUser> {
  async createAdopteeUser(
    createAccountInput: CreateAccountAdopteeUserInput,
    user: User,
  ): Promise<void> {
    const adopteeUser = this.create({ user, ...createAccountInput });
    await this.save(adopteeUser);
  }

  async getOneAdopteeUserById(id: number): Promise<AdopteeUser> {
    const user = await this.createQueryBuilder('adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .where('adopteeUser.userId = :id', { id })
      .getOne();

    if (!user) {
      throw new BadRequestException(
        `The user with (id:${id}) isn't AdopteeUser`,
      );
    }
    return user;
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]> {
    const allUsers = await this.createQueryBuilder('adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .getMany();
    return allUsers;
  }

  async findOneAdopteeUserByNickname(nickname: string): Promise<AdopteeUser> {
    const adopteeUser = await this.findOne({ nickname });
    return adopteeUser;
  }

  async updateAdopteeUser(
    adopteeUser: AdopteeUser,
    input: UpdateAdopteeUserInput,
  ) {
    const { user: userInput, ...adopteeInput } = input;
    adopteeUser.user = { ...adopteeUser.user, ...userInput };
    return await this.save({
      ...adopteeUser,
      ...adopteeInput,
    });
  }
}

@EntityRepository(AdoptUser)
export class AdoptUserRepository extends Repository<AdoptUser> {
  async createAdoptUser(
    createAccountInput: CreateAccountAdoptUserInput,
    user: User,
  ): Promise<void> {
    const adoptUser = this.create({ user, ...createAccountInput });
    await this.save(adoptUser);
  }

  async getOneAdoptUserById(id: number): Promise<AdoptUser> {
    const user = await this.createQueryBuilder('adoptUser')
      .leftJoinAndSelect('adoptUser.user', 'user')
      .where('adoptUser.userId = :id', { id })
      .getOne();
    return user;
  }

  async getAuthenticatedAdoptUsers(
    getAdoptUsersArgs: GetAdoptUsersArgs,
  ): Promise<AdoptUser[]> {
    const { page } = getAdoptUsersArgs;
    const users = await this.createQueryBuilder('adoptUser')
      .leftJoinAndSelect('adoptUser.user', 'user')
      .where('adoptUser.isAuthenticated = true')
      .skip(10 * (page - 1))
      .take(10)
      .orderBy('adoptUser.userId', 'DESC')
      .getMany();
    return users;
  }

  async findOneAdoptUserByNickname(nickname: string): Promise<AdoptUser> {
    const adoptUser = await this.findOne({ nickname });
    return adoptUser;
  }

  async updateAdoptUser(adoptUser: AdoptUser, input: UpdateAdoptUserInput) {
    const { user: userInput, ...adoptInput } = input;
    adoptUser.user = { ...adoptUser.user, ...userInput };
    return await this.save({
      ...adoptUser,
      ...adoptInput,
    });
  }
}
