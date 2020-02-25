import requests
import json


def get_todos():
    url = 'https://jsonplaceholder.typicode.com/todos'
    r = requests.get(url)
    todos = r.json()
    todos_list = {'todos': todos}
    return json.dumps(todos_list)
