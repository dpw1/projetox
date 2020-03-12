from django.shortcuts import render

# Create your views here.
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.shortcuts import redirect

import sys
from .meli import Meli
sys.path.append('ml')


def connect_to_meli():
    '''
    Connects to Mercado Livre's API using an user account.
    '''
    client_id = 3798470433211711
    client_secret = "U3BJRpwBMRKg8Uy01vSrEOUe7PoZIFAh"

    access_token = 'APP_USR-3798470433211711-030300-28b5d12a24fc11484195122ee1fb62a9-532375803'
    refresh_token = 'TG-5e5d9f2198633100066d5e8e-532375803'
    meli = Meli(client_id=client_id, client_secret=client_secret,
                access_token=access_token, refresh_token=refresh_token)
    return meli


def get_meli_data(path=None):
    '''
    Get data from Mercado Livre's account.

    :param str path: The path to get the data from. Use '/users/me' to get data from current user.
    :return: JSON with data.
    '''
    meli = connect_to_meli()
    params = {'access_token': meli.access_token}
    response = meli.get(path=path, params=params)
    print(response.content)
    return response


def update(path=None, body=None):
    meli = connect_to_meli()
    params = {'access_token': meli.access_token}
    print(id, body)
    response = meli.put(path=path, body=body, params=params)
    return response


def post(body=None):
    meli = connect_to_meli()
    params = {'access_token': meli.access_token}

    response = meli.post(path="/items", body=body, params=params)
    return response


def meli_playground(request):
    response = HttpResponse(content_type='application/json')

    connect_to_meli()

    ## GET ##
    meli_response = get_meli_data(path='/users/me')

    ## POST ##
    # body={
    #     "title":"Item de test - No Ofertar",
    #     "category_id":"MLB3530",
    #     "price":350,
    #     "currency_id":"BRL",
    #     "available_quantity":10,
    #     "buying_mode":"buy_it_now",
    #     "condition":"new",
    #     "listing_type_id":"gold_special",
    #     "description":{
    #         "plain_text":"Descripción con Texto Plano \n"
    #     },
    #     "video_id":"YOUTUBE_ID_HERE",
    #     "sale_terms":[
    #         {
    #             "id":"WARRANTY_TYPE",
    #             "value":"novo"
    #         },
    #         {
    #             "id":"WARRANTY_TIME",
    #             "value_name":"90 dias"
    #         }
    #     ],
    #     "pictures":[
    #         {
    #             "source":"http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg"
    #         }
    #     ],
    #     "attributes":[
    #         {
    #             "id":"BRAND",
    #             "value_name":"Marca del producto"
    #         },
    #         {
    #             "id":"EAN",
    #             "value_name":"7898095297749"
    #         }
    #     ]
    #     }
    # meli_response = post(body=body)

    ## UPDATE ##
    # body = {"title":"simple test two! - No Ofertar"}
    # meli_response = update(path='/items/MLB1453170832', body=body)

    response.content = meli_response.content
    return response
