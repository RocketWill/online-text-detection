import os
from os import listdir
from os.path import isfile, join
from flask import url_for
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
        resp = {'status': 'Done', 'message': 'Upload successfully.', 'id': None, 'images': {}}
        args = text_detection_parser.parse_args()
        analysis_id = str(args['analysis_id'])
        resp['id'] = analysis_id

        target_folder = os.path.join(file_storage_path, analysis_id)
        original_file = [f for f in listdir(target_folder) if f.find("original") > -1][0]
        resp['images']['original'] = url_for('static', filename="upload" + "/" + analysis_id + '/' + original_file)

        # start text detection
        processed_file = text_detection(analysis_id, original_file)
        resp['images']['processed'] = url_for('static', filename="upload" + "/" + analysis_id + '/' + processed_file)

        return resp

    def options(self):
        return build_cors_prelight_response()

def text_detection(analysis_id, original_file_name):
    return original_file_name
