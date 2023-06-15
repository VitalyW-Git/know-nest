import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConnectDb = (): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.POSTGRES_PORT,
  username: 'nest_test',
  password: 'nest_test',
  database: 'nest_test_postgres',
  retryAttempts: 10, // Количество попыток подключения к базе данных (по умолчанию: 10)
  synchronize: true, //Если true автоматически загруженные модели будут синхронизированы (по умолчанию: true)
  autoLoadModels: true, // Если true, модели будут загружены автоматически (по умолчанию: false)
  logging: process.env.SQL_LOGGING === 'true',
  define: {
    /**
     * отключаем прежнее поведение
     * error: Unknown column 'createdAt' in 'field list'
     */
    timestamps: false,
  },
});
