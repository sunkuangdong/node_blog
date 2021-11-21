import { createConnection, getConnectionManager } from "typeorm";

// 初始化，页面第一次 connect 数据库
const promise = (async function () {
    // 如果发生更改
    // 页面重启的时候关闭当前 connect
    const manager = getConnectionManager()
    // 是否有默认的 connect
    if (!manager.has('default')) {
        // 没有默认的就创建链接
        return await createConnection()
    } else {
        const current = manager.get('default')
        if (current.isConnected) {
            // 有默认的就复用链接
            return current
        } else {
            return await createConnection();
        }

    }
})()

export const getDatabaseConnection = async () => {
    // 等 create 结束了再获取
    return promise;
}