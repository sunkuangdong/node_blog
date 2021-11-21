import { Connection, createConnection } from "typeorm";

// 能否模拟一个
let connection: Connection = null

const create = async () => {
    connection = await createConnection()
    return connection
}

const get = () => {
    return connection
}

const has = () => {
    return connection !== null
}