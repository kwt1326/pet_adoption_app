import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';

export const ColumnTextType: WithLengthColumnType =
  process.env.NODE_ENV === 'prod' ? 'varchar2' : 'varchar';
