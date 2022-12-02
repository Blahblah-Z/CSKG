# 图数据库

Neo4j 3.5.35

## Neo4j安装

可根据[官网](https://neo4j.com/)指导安装数据库
Neo4j数据库操作请查看[官方文档](https://neo4j.com/docs/)

## 数据库导入


### 1 将cskg.db.dump文件放入 Neo4j安装路径下 **/data/database**
### 2 Neo4j安装路径下 修改配置文件 **/conf/neo4j.conf**
```python
# The name of the database to mount
dbms.active_database=cskg.db
#dbms.active_database=graph.db
```
### 3 启动Neo4j服务
neo4j.bat在安装路径bin文件夹下
```bash
.\bin\neo4j.bat console
```
控制台返回信息
```bat
2022-12-02 01:29:13.416+0000 INFO  ======== Neo4j 3.5.35 ========
2022-12-02 01:29:13.447+0000 INFO  Starting...
2022-12-02 01:29:26.522+0000 INFO  Bolt enabled on 127.0.0.1:7687.
2022-12-02 01:29:28.930+0000 INFO  Started.
2022-12-02 01:29:30.012+0000 INFO  Remote interface available at http://localhost:7474/
```
可登录 http://localhost:7474/ 进入Neo4j管理界面
