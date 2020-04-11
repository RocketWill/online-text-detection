from flask_restplus import Api
from flask import Blueprint

from .main.controller.file_upload_controller import api as file_upload_ns
from .main.controller.text_detection_controller import api as text_detection_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(file_upload_ns, path='/upload')
api.add_namespace(text_detection_ns, path='/text-detection')