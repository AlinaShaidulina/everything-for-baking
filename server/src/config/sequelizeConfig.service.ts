import {Injectable} from "@nestjs/common";
import {SequelizeOptionsFactory} from "@nestjs/sequelize";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/users.model";

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createSequelizeOptions(connectionName?: string) {
        const {
            sql: { dialect, logging, host, port, username, password, database },
        } = this.configService.get('database');

        return {
            dialect,
            logging,
            host,
            port,
            username,
            password,
            database,
            models: [User],
            autoLoadModels: true,
            synchronize: true,
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        };
    }
}