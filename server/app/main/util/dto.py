from flask_restplus import Namespace, fields
import werkzeug

class FileUploadDto:
    api = Namespace('file storage', description='Upload file related operations')
    file_upload_parser = api.parser()
    file_upload_parser.add_argument('file',
                             type=werkzeug.datastructures.FileStorage,
                             location='files',
                             required=True,
                             help='file')
    file_upload_parser.add_argument('analysis_id', required=True, help="analysis id")

class TextDetectionDto:
    api = Namespace('text detection', description='Text detection based on CRAFT model')
    text_detection_parser = api.parser()
    text_detection_parser.add_argument('analysis_id', required=True, help="analysis id")