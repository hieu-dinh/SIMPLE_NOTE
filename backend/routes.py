from app import app, db
from flask import request, jsonify
from models import Note

# Get all notes
@app.route("/api/notes", methods=["GET"])
def get_notes():
    notes = Note.query.all()
    notes_json = [note.to_json() for note in notes]
    return jsonify(notes_json)

# Create note
@app.route("/api/notes", methods=["POST"])
def create_note():
    try:
        data = request.json
        required_fields = ["title"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f"Missing required field: {field}"}), 400
        title = data.get("title")
        content = data.get("content")
        #fetching the random image url from the api
        img_url = "https://avatar.iran.liara.run/public"
        new_note = Note(title=title, content=content, img_url=img_url)
        db.session.add(new_note)
        db.session.commit()
        return jsonify({"msg":"Note created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

# Delete note
@app.route("/api/notes/<int:id>", methods=["DELETE"])
def delete_note(id):
    try:
        note = Note.query.get(id)
        if note is None:
            return jsonify({"error":"Note not found"}), 404
        db.session.delete(note)
        db.session.commit()
        return jsonify({"msg":"Note deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update note
@app.route("/api/notes/<int:id>", methods=["PATCH"])
def update_note(id):
    try:
        note = Note.query.get(id)
        if note is None:
            return jsonify({"error":"Note not found"}), 404
        data = request.json
        note.title = data.get("title", note.title)
        note.content = data.get("content", note.content)
        db.session.commit()
        return jsonify(note.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    ## changes test to push to github