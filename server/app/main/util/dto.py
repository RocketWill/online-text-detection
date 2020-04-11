from flask_restplus import Namespace, fields
import werkzeug

class FileUploadDto:
    api = Namespace('file storage', description='Upload pcap files related operations')
    file_upload_parser = api.parser()
    file_upload_parser.add_argument('file',
                             type=werkzeug.datastructures.FileStorage,
                             location='files',
                             required=True,
                             help='file')
    file_upload_parser.add_argument('analysis_id', required=True, help="analysis id")