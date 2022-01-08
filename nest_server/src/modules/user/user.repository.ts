import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AdoptUser } from "src/entities/adopt-user.entity";
import { AdopteeUser } from "src/entities/adoptee-user.entity";
import { User, UserType } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateAccountAdopteeUserInput, CreateAccountAdoptUserInput, CreateAccountUserInput } from "./dtos/create-account.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async createUser(createAccountInput: CreateAccountUserInput): Promise<User> {
    const user = await this.create({ ...createAccountInput });
    return await this.save(user);
  }
}

@EntityRepository(AdopteeUser)
export class AdopteeUserRepository extends Repository<AdopteeUser> {
  async createAdopteeUser(createAccountInput: CreateAccountAdopteeUserInput, user: number): Promise<void> {
    const adopteeUser = this.create({user, ...createAccountInput})
    await this.save(adopteeUser);
  }
}

@EntityRepository(AdoptUser)
export class AdoptUserRepository extends Repository<AdoptUser> {
  async createAdoptUser(createAccountInput: CreateAccountAdoptUserInput, user: number): Promise<void> {
    const adoptUser = this.create({user, ...createAccountInput})
    await this.save(adoptUser);
  }
}