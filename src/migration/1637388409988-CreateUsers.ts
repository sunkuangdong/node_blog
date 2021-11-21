import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1637388409988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: "posts", // 名称必传
            // 列
            columns: [
                // 第一列
                { name: 'id', isGenerated: true, type: 'int', generationStrategy: "increment", isPrimary: true },
                { name: 'title', type: "varchar" },
                { name: 'content', type: "varchar" },
                { name: 'author_id', type: "int" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("posts");
    }

}
