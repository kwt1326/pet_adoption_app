import { UserType } from 'src/entities/user.entity';

export interface Payload {
  id: number;
  email: string;
  nickname: string;
  userType: UserType;
  isAvailable: boolean;
}
