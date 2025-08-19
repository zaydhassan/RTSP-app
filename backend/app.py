from flask import Flask, request, jsonify, Response, send_from_directory
from flask_cors import CORS
from bson.objectid import ObjectId
import os
from models import overlays

app = Flask(__name__, static_folder="static")
CORS(app)

@app.route('/video_feed')
def video_feed():
    return send_from_directory('static', 'demo.m3u8', mimetype='application/vnd.apple.mpegurl')

@app.route('/video_segment/<segment>')
def video_segment(segment):
    # Serve .ts segments for HLS
    return send_from_directory('static', segment, mimetype='video/MP2T')

@app.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    inserted = overlays.insert_one(data)
    return jsonify({'_id': str(inserted.inserted_id), 'message': 'Overlay created'}), 201

@app.route('/overlays', methods=['GET'])
def get_overlays():
    all_overlays = list(overlays.find())
    for ov in all_overlays:
        ov['_id'] = str(ov['_id'])
    return jsonify(all_overlays)

@app.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    data = request.json
    overlays.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'message': 'Overlay updated'})

@app.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    overlays.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Overlay deleted'})

if __name__ == '__main__':
    app.run(debug=True)