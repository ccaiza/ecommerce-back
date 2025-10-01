
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root123',
        database: 'delivery',
        entities: [
            __dirname + '/../entidad/*.entity{.ts,.js}',
        ],
        synchronize: false,
        logging: ['query', 'error'], // Aquí activas los logs SQL
      });

      return dataSource.initialize();
    },
  },
];
