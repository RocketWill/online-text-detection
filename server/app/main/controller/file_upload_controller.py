import os
from flask import request, url_for, send_file
from flask import make_response
from flask_cors import CORS, cross_origin
from flask_restplus import Resource
from ..util.dto import FileUploadDto

FILE_STORAGE_PATH = 'static/upload'

api = FileUploadDto.api
file_upload_parser = FileUploadDto.file_upload_parser

@api.route('/')
class FileUpload(Resource):
    @api.expect(file_upload_parser)
    def post(self):
        resp = {'status': 'Done', 'message': 'Upload successfully.', 'image': None}
        args = file_upload_parser.parse_args()
        filename = str(args['file'].filename)
        analysis_id = str(args['analysis_id'])

        destination = os.path.join(FILE_STORAGE_PATH, analysis_id + '/')
        if not os.path.exists(destination):
            os.makedirs(destination)
        args['file'].save(destination + "/" + filename)
        resp['image'] = url_for('static', filename="upload" +"/"+analysis_id + '/' + filename)
        return resp, 200

    def options(self):
        return build_cors_prelight_response()

def build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response