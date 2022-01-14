import { UserType } from 'src/entities/user.entity';

export interface Payload {
  email: string;
  userType: UserType;
  isAvailable: boolean;
}
