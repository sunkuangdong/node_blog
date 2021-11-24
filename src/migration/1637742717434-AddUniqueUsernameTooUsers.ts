import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddUniqueUsernameTooUsers1637742717434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建一个索引
        // 作用是如果数据库中存在和你传的username相同的值
        // 就无法创建这个索引
        await queryRunner.createIndex("users",
            new TableIndex({
                name: "users_username",
                columnNames: ["username"],
                isUnique: true
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 降级
        await queryRunner.dropIndex("users", "users_username")
    }
}
