import json
import sqlite3


def get_database_size():
    conn = sqlite3.connect("comments.db")
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM comments")
    database_size = c.fetchone()[0]
    conn.close()
    return database_size


def load_comments():
    with open("comments.json", "r") as f:
        comments = json.load(f)
        conn = sqlite3.connect("comments.db")
        c = conn.cursor()
        for comment in comments["comments"]:

            c.execute(  # create table if none exists
                """
                CREATE TABLE IF NOT EXISTS comments (
                    id TEXT PRIMARY KEY,
                    author TEXT,
                    text TEXT,
                    date TEXT,
                    likes INTEGER,
                    image TEXT
                )
            """
            )

            c.execute(  # Put data in
                """
                INSERT OR IGNORE INTO comments (id, author, text, date, likes, image)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                (
                    comment.get("id", ""),
                    comment.get("author", ""),
                    comment.get("text", ""),
                    comment.get("date", ""),
                    int(comment.get("likes", 0)),
                    comment.get("image", ""),
                ),
            )

            conn.commit()
