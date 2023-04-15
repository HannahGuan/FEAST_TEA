from flask import Flask, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_folder='flask_react/build', static_url_path='/')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    print('Enter index page')
    return app.send_static_file('index.html')


@socketio.on('connect')
def test_connect():
    print('Client connected')


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@app.route('/trigger1')
def trigger_1():
    print('t1')
    socketio.emit('trigger', {'message': 1})
    return 'trigger 1'

@app.route('/set')
def cup_lift():
    print('lift')
    socketio.emit('data', {'message': 'CUP SET'})
    return 'Cup lifted'


@app.route('/trigger5')
def trigger_5():
    print('t5')
    socketio.emit('trigger', {'message': 5})
    return 'trigger 5'

@app.route('/trigger9')
def trigger_9():
    print('t9')
    socketio.emit('trigger', {'message': 9})
    return 'trigger 9'