import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from dirt_detector import detect_dirt
from tear_detector import tear_detector
from PIL import Image
from io import BytesIO
from models import Call, Dirt, Tear

app = Flask(__name__)
CORS(app)


@app.route("/api/detect-dirt", methods=["POST"])
def dirt_detection():
    calls = Call()
    dirt_calls = Dirt()
    req = request.json
    imgb64 = req.get("image")[23:]
    image_bytes = base64.b64decode(imgb64)
    img = Image.open(BytesIO(image_bytes))
    dirt_prob = detect_dirt(img)
    call_id = calls.save([{"call_type": "dirt", "call_time": req.get("timestamp")}])
    dirty = True if dirt_prob >= 0.5 else False
    dirt_calls.save(
        {
            "call_prob": dirt_prob,
            "call_verdict": dirty,
            "call_id": call_id["call_id"][0],
        }
    )
    return jsonify({"id": call_id["call_id"][0], "dirty": dirty, "probability": dirt_prob, "call_time": req.get("timestamp")})


@app.route("/api/detect-tear", methods=["POST"])
def tear_detection():
    calls = Call()
    tear_calls = Tear()
    req = request.json
    tears = tear_detector()
    call_ids = calls.save(
        [
            {"call_type": "tear", "call_time": req.get("timestamp")}
            for _ in range(len(tears))
        ]
    )
    print(call_ids)
    tear_calls.save(
        [
            {
                "point": tear["point"],
                "severity": tear["severity"],
                "call_id": call_ids["call_id"][i],
            }
            for i, tear in enumerate(tears)
        ]
    )
    return jsonify(tears)


@app.route("/api/history", methods=["GET"])
def get_history():
    dirt_calls = Dirt()
    tear_calls = Tear()
    dirt = dirt_calls.findall()
    tear = tear_calls.findall()
    return jsonify({"dirt": dirt, "tear": tear})


if __name__ == "__main__":
    app.run(debug=True)
