import { BadRequestException } from '@nestjs/common';
import { AdoptUser } from 'src/entities/adopt-user.entity';
import { AdopteeUser } from 'src/entities/adoptee-user.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { checkDuplicateFieldInput } from './dtos/check-duplicate-field.dto';
import {
  CreateAccountAdopteeUserInput,
  CreateAccountAdoptUserInput,
  CreateAccountUserInput,
} from './dtos/create-account.dto';

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
      .where("id = :id", { id })
      .execute();
    return result;
  }

  async checkDuplicateField(checkFieldInput: checkDuplicateFieldInput) {
    return true;
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

  async getOneAdopteeUserById(
    id: number
  ): Promise<AdopteeUser> {
    const user = await this
      .createQueryBuilder('adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .where('adopteeUser.userId = :id', { id })
      .getOne();

    if (!user) {
      throw new BadRequestException(`The user with (id:${id}) isn't AdopteeUser`)
    }
    return user;
  }

  async getAllAdopteeUser(): Promise<AdopteeUser[]>{
    const allUsers = await this
      .createQueryBuilder('adopteeUser')
      .leftJoinAndSelect('adopteeUser.user', 'user')
      .getMany();
    return allUsers;
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

  async getOneAdoptUserById(
    id: number
  ): Promise<AdoptUser> {
    const user = await this
      .createQueryBuilder('adoptUser')
      .leftJoinAndSelect('adoptUser.user', 'user')
      .where('adoptUser.userId = :id', { id })
      .getOne();

    if (!user) {
      throw new BadRequestException(`The user with (id:${id}) isn't AdoptUser`)
    }
    return user;
  }

  async getAllAdoptUser(): Promise<AdoptUser[]>{
    const allUsers = await this
      .createQueryBuilder('adoptUser')
      .leftJoinAndSelect('adoptUser.user', 'user')
      .getMany();
    return allUsers;
  }
}
