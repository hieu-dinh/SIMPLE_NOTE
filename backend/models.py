from app import db

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=True)
    img_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "content": self.content,
            "imgurl": self.img_url
        }
