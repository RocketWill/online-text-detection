from flask import request
from flask_restplus import Resource

from ..util.dto import FileUploadDto

api = FileUploadDto.api
_file_upload = FileUploadDto.file_upload

@api.route('/')
class UploadFile(Resource):
    @api.response(200, 'File successfully upload.')
    @api.doc('create a new user')
    @api.expect(_file_upload, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return {'status': 200}
