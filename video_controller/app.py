from flask import Flask, send_file
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


@app.route('/set10')
def cup_set():
    print('set')
    video_path = 'tea_art.mp4'
    return send_file(video_path, mimetype='video/mp4')

@app.route('/lift10')
def cup_lift():
    print('lift')
    socketio.emit('data', {'message': 2})
    video_path = 'video/tea_art.mp4'
    #return send_file(video_path, mimetype='video/mp4')
    return 'Cup lifted'


@app.route('/video_art')
def video_art():
    video_path = 'tea_art.mp4'
    return send_file(video_path, mimetype='video/mp4')

if __name__ == "__main__":
    app.run(host='192.168.4.59', port=3000)