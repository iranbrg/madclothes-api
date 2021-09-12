import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1631233933405 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: "first_name",
                    type: "varchar",

                },
                {
                    name: "last_name",
                    type: "varchar",

                },
                {
                    name: "email",
                    type: "varchar",

                },
                {
                    name: "password",
                    type: "varchar",

                },
                {
                    name: "birthdate",
                    type: 'date',
                    isNullable: true

                },
                {
                    name: "phone_number",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "cpf",
                    type: "varchar",
                    isNullable: true

                },
                {
                    name: "zip_code",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "avatar",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "is_admin",
                    type: "boolean",
                    default: 'false',

                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true);
    }
}
