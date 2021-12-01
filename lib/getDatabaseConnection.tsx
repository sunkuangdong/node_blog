import { createConnection, getConnectionManager } from "typeorm";
import "reflect-metadata"
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";
import config from "ormconfig.json"

const create = async () => {
    // @ts-ignore
    // 没有默认的就创建链接
    return await createConnection({
        ...config,
        host: process.env.NODE_ENV === "production" ? "localhost" : config.host,
        database: process.env.NODE_ENV === "production" ? "blog_production" : "blog_development",
        entities: [Post, User, Comment]
    })
}

// 初始化，页面第一次 connect 数据库
const promise = (async function () {
    // 如果发生更改
    // 页面重启的时候关闭当前 connect
    const manager = getConnectionManager()
    // // 是否有默认的 connect
    // if (!manager.has('default')) {
    //     // 没有默认的就创建链接
    //     return create()
    // } else {
    //     const current = manager.get('default')
    //     if (current.isConnected) {
    //         // 关闭之前的链接
    //         await current.close()
    //         // 重新建立建立连接
    //     } else {
    //         return create()
    //     }
    // }
    const current = manager.has('default') && manager.get('default')
    if (current && current.isConnected) {
        await current.close()
    }
    return create()
})()

export const getDatabaseConnection = async () => {
    // 等 create 结束了再获取
    return promise;
}