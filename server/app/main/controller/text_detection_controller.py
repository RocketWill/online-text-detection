import os
import pathlib
from flask import request, url_for, abort
from flask import make_response
from flask_restplus import Resource
from ..util.dto import TextDetectionDto
from app.main.config import static_folder
from app.main import build_cors_prelight_response

file_storage_path = os.path.join(static_folder, 'upload')

api = TextDetectionDto.api
text_detection_parser = TextDetectionDto.text_detection_parser

@api.route('/')
class FileUpload(Resource):
    @api.expect(text_detection_parser)
    def post(self):
        resp = {'status': 'Done', 'message': 'Upload successfully.', 'id': None}
        args = text_detection_parser.parse_args()
        analysis_id = str(args['analysis_id'])
        resp['id'] = analysis_id
        return resp

    def options(self):
        return build_cors_prelight_response()
