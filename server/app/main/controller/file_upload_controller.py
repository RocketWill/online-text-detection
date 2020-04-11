import os
import pathlib
from flask import request, url_for, abort
from flask import make_response
from flask_restplus import Resource
from ..util.dto import FileUploadDto
from app.main.config import static_folder

file_storage_path = os.path.join(static_folder, 'upload')

api = FileUploadDto.api
file_upload_parser = FileUploadDto.file_upload_parser

@api.route('/')
class FileUpload(Resource):
    @api.expect(file_upload_parser)
    def post(self):
        resp = {'status': 'Done', 'message': 'Upload successfully.', 'image': None}
        args = file_upload_parser.parse_args()
        try:
            extension = pathlib.Path(str(args['file'].filename)).suffix
            filename = "original" + extension
            analysis_id = str(args['analysis_id'])

            destination = os.path.join(file_storage_path, analysis_id)
            if not os.path.exists(destination):
                os.makedirs(destination)
            args['file'].save(destination + "/" + filename)
            resp['image'] = url_for('static', filename="upload" + "/" + analysis_id + '/' + filename)
            return resp, 200
        except:
            resp = {'status': 'Failed', 'message': 'Upload failed.', 'image': None}
            return resp, 500

    def options(self):
        return build_cors_prelight_response()

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
        h['Access-Control-Allow-Methods'] = 'GET'
        h['Access-Control-Allow-Headers'] = 'X-Requested-With'

        resp.headers = h
        return resp

    return abort(403)