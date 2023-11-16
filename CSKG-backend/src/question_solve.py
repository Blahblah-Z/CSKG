# from src.transfer import TransferNgql
from platform import node
from src.analyze import Analyze
import src.transfer as transfer


class Solve(object):
    def __init__(self):
        self.analyze = Analyze()
        self.transfer_ngql = transfer.TransferNgql()

    def query(self, question):
        anal = self.analyze.solve(question)
        # print('实体，输出： ',anal)
        result, node = self.transfer_ngql.solve(anal)
        return result, node

