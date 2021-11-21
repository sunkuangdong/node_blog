import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1637378321755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: "users", // 名称必传
            // 列
            columns: [
                // 第一列
                { name: 'id', isGenerated: true, type: 'int', generationStrategy: "increment", isPrimary: true },
                { name: 'username', type: "varchar" },
                { name: 'password_digest', type: "varchar" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("users");
    }

}
