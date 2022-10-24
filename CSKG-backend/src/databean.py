class DataBean:
    
    def __init__(self):
        self.id : str = ''
        self.name : str = ''
        self.enetitycls : str = ''
        
    def set_all(self, id:str,name:str,enetitycls:str):
        self.id = id
        self.name = name
        self.enetitycls = enetitycls

    def set_id(self, id:str):
        self.id = id
    
    def set_name(self, name:str):
        self.name = name
    
    def set_eneitycls(self, entitycls:str):
        self.enetitycls = entitycls
    
    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_entitycls(self):
        return self.enetitycls
    

    
