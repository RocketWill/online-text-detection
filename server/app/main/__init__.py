from flask import Flask, request, make_response, abort
from flask_cors import CORS
from .config import config_by_name

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    return app

def build_cors_prelight_response():
    handle_result = {'result': True, 'msg': 'success'}
    try:
        # origin, where does this request come from, like www.amazon.com
        origin = request.environ['HTTP_ORIGIN']
    except KeyError:
        origin = None

    # only accept CORS request from localhost
    if origin and (origin.find('localhost') > -1 or origin.find('127.0.0.1') > -1):
        resp = make_response(str(handle_result))
        resp.headers['Content-Type'] = 'application/json'

        h = resp.headers
        # prepare headers for CORS authentication
        h['Access-Control-Allow-Origin'] = origin
        h['Access-Control-Allow-Methods'] = '*'
        h['Access-Control-Allow-Headers'] = '*'

        resp.headers = h
        return resp

    return abort(403)