import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/common/core.entity';
import { AdoptUser } from 'src/entities/adopt-user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class AuthenticateInfo extends CoreEntity {
  @ManyToOne(() => AdoptUser)
  @JoinColumn()
  @Field(() => AdoptUser)
  adoptUser: AdoptUser;

  @Column({ nullable: false })
  @Field(() => String)
  registrantNumber: string;
}
