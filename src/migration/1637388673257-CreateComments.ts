import { MigrationInterface, QueryRunner, Table } from "typeorm";

// 评论表
export class CreateComments1637388673257 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: "comments", // 名称必传
            // 列
            columns: [
                // 第一列
                { name: 'id', isGenerated: true, type: 'int', generationStrategy: "increment", isPrimary: true },
                // 谁评论的
                { name: 'user_id', type: "int" },
                // 哪篇文章
                { name: 'post_id', type: "int" },
                // 评论内容
                { name: 'content', type: "text" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("comments");
    }

}
