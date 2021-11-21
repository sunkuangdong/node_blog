# 初始代码

## 检查之前的数据库
```
docker ps

// 会返回一个id: 7f40bedb17dd
// 这个id每次不一样，只是举例子
```

## 杀死之前的数据库
```
docker kill 7f40bedb17dd
```

## 删除之前的数据库
```
docker rm 7f40bedb17dd
```

## 启动数据库(得到新的虚拟机)
```
mkdir blog-data

docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

或者旧版 Windows Docker 客户端运行下面的代码

docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 进入当前的虚拟机
```
docker exec -it 7af929b62444 bash
```

## 进入当前的数据库
```
psql -U blog
```

#### 看一下有哪些数据表
```
\l
```

#### 删除表、重新创建、链接表
```
// 删除
drop database blog_development;

// 创建
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

// 链接
\c blog_development
```

## 查看当前数据库表 查看表内容
```
// 查看当前数据库表
\dt

// 查看表内容
select * from comments;
```

## 退出数据库
```
// 快捷键 按两次
control + d
```

## 运行
```
yarn dev
// 做了两件事：
// 第一：启动本地sever
// 第二：babel监听本地seed.ts文件变动，重新编译
```

## 创建 migration：nextjs-blog/src/migration/1637378321755-CreateUsers.ts
```
yarn m:create -n CreateUsers
// 这样就生成了一个表，这个文件的代码会操作这个表
```

#### 运行 1637378321755-CreateUsers.ts 创建表
```
yarn m:run
```