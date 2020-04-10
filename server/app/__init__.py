from flask_restplus import Api
from flask import Blueprint

from .main.controller.file_upload_controller import api as file_upload_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(file_upload_ns, path='/upload')