from asyncio.windows_events import NULL
from contextlib import nullcontext
from html import entities
from multiprocessing.managers import ListProxy
import os
from platform import node
from sqlite3 import dbapi2
from src.graph import GraphDB
import yaml
import content


class TransferNgql:

    def __init__(self):
        self.intents = {}
        self.load_data()

    def load_data(self):
        path = os.path.abspath(os.path.dirname(os.getcwd())) + os.path.sep
        # 加载意图特征库
        with open(f"D:\\Web\\CSKG\\CSKG-backend\\src\\intention.yaml", "r", encoding='utf-8') as file:
            self.intents = yaml.safe_load(file)["intents"]

    def solve(self, intent):
        intents = list(intent[1])
        intent_name = intents[0]
        # intent_name = "drawback"
        # if len(intent["intents"]) > 0:
        #     intent_name = intent["intents"][0]
        act_name = self.intents.get(intent_name).get("action")
        # act_name = 'RelationshipAction'
        result = ''
        # 根据匹到的不同意图，生成对应意图的ngql语句
        if act_name == 'RelationshipAction':
            result, node = self.relationship_action(intent)
        return result, node


    def relationship_action(self,intent):
        try:
            entities = intent[0].keys()
            list = []
            db = GraphDB(content.url,content.username,content.password)
            for item in entities:
                result = db.search_answer(item)
                node = db.search_answer_node(item)
                for record in result:
                    res = db.serialize_answer(record)
                    list.append(res)
            db.close()
            return list, node

        except Exception as e:
            print(f"关系实体识别错误！intent: {intent}")
            print(e)
            list = []
            node =[]
            return list,node