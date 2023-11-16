# 数据库

Neo4j 3.5.35 

# 框架

flask 1.1.1

# 运行

安装依赖
``` bash
pip install -r requirements.txt
```

运行
```bash
python app.py
```

# 目录结构

```html
src
├──analyze.py       // 处理语句 提取实体
├──databean.py      //（未使用）
├──graph.py         // 图数据库操作 连接，查询
├──mysql.py         // 关系数据库
├──question_solve.py      
├──transfer.py      // 匹配关系，生成（实体，关系）对 
├──wordlist.json    // 实体列表
├──intention.yaml   // 关系列表
│   
static  //  html测试文件
│   

```