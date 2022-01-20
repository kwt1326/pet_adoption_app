import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './envConfig';
import modules from './modules';
import entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? 'config/.dev.env' : 'config/.prod.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema,
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'prod',
      autoSchemaFile: true,
      // installSubscriptionHandlers: true,
      context: ({ req, connection }) => {
        // if apply global guard, get token from GqlExecutionContext
        const HEADER_TOKEN_KEY = 'x-jwt';
        return {
          token: req
            ? req.headers[HEADER_TOKEN_KEY]
            : connection.context[HEADER_TOKEN_KEY],
        };
      },
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV !== 'dev'
        ? {
            type: 'oracle',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
            synchronize: true,
            logging: true,
            entities,
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            logging: true,
            entities,
          },
    ),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
