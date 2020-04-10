from flask_restplus import Namespace, fields
from werkzeug.datastructures import FileStorage

class FileUploadDto:
    api = Namespace('file upload', description='files related operations')
    file_upload = api.model('file upload', {
        'name': fields.String(required=True, description='File name'),
        'file': fields.String(required=True, description='File data'),
        'analysis_id': fields.String(required=True, description='analysis id'),
    })