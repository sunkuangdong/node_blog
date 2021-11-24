import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { getDatabaseConnection } from "lib/getDatabaseConnection";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment") id: number;
    @Column("varchar") username: string;
    @Column("varchar") passwordDigest: string;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
    @OneToMany(type => Post, post => post.author) posts: Post[];
    @OneToMany(type => Comment, comment => comment.user) comments: Comment[];

    errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[],
    }

    password: string
    passwordConfirmation: string
    async validate() {
        // 用户名错误不匹配
        if (this.username.trim() === '') {
            this.errors.username.push("用户名为空")
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push("格式不合法")
        }
        if (this.username.trim().length > 8) {
            this.errors.username.push("长度不得超出8位")
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push("长度不得小于3位")
        }
        // 先看数据库中是否已经存在当前username
        const found = await (await getDatabaseConnection()).manager.find(User, { username: this.username })
        if (found.length > 0) {
            this.errors.username.push("用户名已存在")
        }

        // 密码不匹配的错误处理
        if (!this.password.trim()) {
            this.errors.password.push("请输入密码")
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push("密码不匹配")
        }
    }

    hasError() {
        return !!Object.values(this.errors).find(item => item.length > 0)
    }
}
