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

  createUser(createAccountInput: CreateAccountUserInput): User {
    return this.create({ ...createAccountInput });
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
  async createAndSaveAdopteeUser(
    createAccountInput: CreateAccountAdopteeUserInput,
    user: User,
  ): Promise<AdopteeUser> {
    const adopteeUser = this.create({ user, ...createAccountInput });
    return await this.save(adopteeUser);
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
  async createAndSaveAdoptUser(
    createAccountInput: CreateAccountAdoptUserInput,
    user: User,
  ): Promise<AdoptUser> {
    const adoptUser = this.create({ user, ...createAccountInput });
    return await this.save(adoptUser);
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
    let users = await this.createQueryBuilder('adoptUser')
      .leftJoinAndSelect('adoptUser.user', 'user')
      .where(
        `adoptUser.isAuthenticated = ${
          // ORA-00904 "TRUE" 타입이 존재하지 않습니다. (ORACLE RDBS 에서 boolean 을 지원하지 않음) NUMBER 로 저장되어 있기 때문에 조치합니다.
          // ORACLE RDBS 에서 boolean 타입을 정의할때는 char(1) 형식으로 컬럼 정의후, "Y" : "N" 으로 검사합니다. (이 프로젝트에서 사용할 경우 Entity 단에서 수동 매핑 해야함)
          process.env.NODE_ENV !== 'prod' ? 'true' : 1
        }`,
      )
      .skip(10 * (page - 1))
      .take(10)
      .orderBy('adoptUser.userId', 'DESC')
      .getMany();

    users = users.map((value) => ({ ...value, id: value.userId }));
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
