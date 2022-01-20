/* eslint-disable @typescript-eslint/no-var-requires */
import * as Joi from 'joi';

/**
 * '클라우드 인스턴스 (AWS, Azure, OCI 등의 VM Instance)' 내에 있어야 하는 파일 (git 으로 관리되는 폴더 밖에 있음)
 *
 * Wallet_DB <Folder> // (oracle : tnsnames.ora 등 wallet 관련 파일이 있음. wallet 압축 해제한 폴더이므로 직접 생성 X)
 * .prod.env // AWS Secret 을 사용하면 좋지만.. 유료 이므로 기존에 많이 사용했던 방식인 서버 인스턴스 내에 저장하는 방식으로 채택
 * * 그러므로 ignoreEnvFile 을 false 해야 할 수도 있음 (런타임때 서비스를 통해 환경변수를 불러오지 않기 때문)
 *
 * app.module.ts 에서 TypeOrmConfig 를 따로 가져오지 않은 이유 : env 파일을 읽어오는 시점이 늦기 때문에 가져오지 않음
 *
 * @author wontae Kim
 */

if (process.env.NODE_ENV === 'prod') {
  const oracledb = require('oracledb');

  oracledb.initOracleClient({
    libDir: '../../oracle_client/instantclient_19_8', // wallet path at the instance
  });
}

export const validationSchema =
  process.env.NODE_ENV === 'dev'
    ? Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        JWT_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      })
    : Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        JWT_SECRET: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_CONNECTION_STRING: Joi.string().required(),
      });
