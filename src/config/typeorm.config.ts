import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typrOrmCongig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/db.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
