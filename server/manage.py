import os
import unittest
from flask_script import Manager
from flask_cors import CORS

from app.main import create_app
from app import blueprint

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static')

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',  # React
  ],

}

app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
app.register_blueprint(blueprint)
app._static_folder = static_file_dir

CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True, crossorigin=True)
#cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.app_context().push()

manager = Manager(app)

@manager.command
def run():
    app.run()

@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()