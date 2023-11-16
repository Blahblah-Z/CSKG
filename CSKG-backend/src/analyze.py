import os
import json
import ahocorasick
import yaml

json_file = r'D:\\CSKG\\CSKG-backend\\src\\wordlist.json'
with open(json_file, "r", encoding='utf-8') as fp:
    wordlist = json.load(fp)

class Analyze(object):
    def __init__(self):

        self.entity_type_map = wordlist
        self.intents_map = {}

    def build_ac_tree(self) -> None:
        # 建立AC树
        self.ac_tree = ahocorasick.Automaton()
        # wordlist为3类实体所有名字构成的特征词库
        for index, word in enumerate(self.entity_type_map.keys()):
            self.ac_tree.add_word(word, (index, word))
        self.ac_tree.make_automaton()

    def get_match_entities(self, question: str) -> dict:
        # 实体提取
        entities_matched = []
        for i in self.ac_tree.iter(question):
            entities_matched.append(i[1][1])
            print(i)
        stop_wds = []
        for wd1 in entities_matched:
            for wd2 in entities_matched:
                if wd1 in wd2 and wd1 != wd2:
                    stop_wds.append(wd1)
        final_wds = [i for i in entities_matched if i not in stop_wds]
        return {
            entity: self.entity_type_map[entity] for entity in final_wds
        }

    def load_data(self) -> None:
        path = os.path.abspath(os.path.dirname(os.getcwd())) + os.path.sep
        # 加载意图特征库
        with open(f"D:\\CSKG\\CSKG-backend\\src\\intention.yaml", "r", encoding='utf-8') as file:
            self.intents = yaml.safe_load(file)["intents"]
        for name, intent in self.intents.items():
            self.intents_map.update({keyword: name for keyword in intent['keywords']})
        print(self.intents_map.keys())
        # 加载实体库
        # self.entity_type_map.update({key: "person" for key in self.entities['person'].keys()})
        # self.entity_type_map.update({key: "monster" for key in self.entities['monster'].keys()})
        # self.entity_type_map.update({key: "property" for key in self.entities['property'].keys()})

    # 意图模板匹配
    def check_intent_words(self, question: str):
        intents_words = set()
        for word in self.intents_map.keys():
            if word in question:
                intents_words.add(self.intents_map[word])
        return intents_words

    def solve(self, question):
        ana = Analyze()
        ana.load_data()
        ana.build_ac_tree()
        enti = ana.get_match_entities(question)
        print(enti)
        outs = ana.check_intent_words(question)
        print(outs)
        return enti, outs
