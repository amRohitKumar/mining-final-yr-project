import sqlite3


class DBModel:
    def __init__(self):
        self.conn = sqlite3.connect("calls.db")
        self.cursor = self.conn.cursor()

    def __del__(self):
        self.conn.close()


class Call(DBModel):
    def __init__(self):
        super().__init__()
        self.cursor.execute(
            """
                CREATE TABLE IF NOT EXISTS calls (
                    id INTEGER PRIMARY KEY,
                    call_type TEXT CHECK (call_type IN ('dirt', 'tear')),
                    call_time TIMESTAMP
                )
            """
        )
        self.conn.commit()

    def save(self, data_list):
        try:
            call_ids = []
            for data in data_list:
                self.cursor.execute(
                    "INSERT INTO calls (call_type, call_time) VALUES (?, ?)",
                    (data["call_type"], data["call_time"]),
                )
                self.conn.commit()
                call_ids.append(self.cursor.lastrowid)
            return {
                "saved": True,
                "message": "Call saved successfully",
                "call_id": call_ids,
            }
        except sqlite3.Error as e:
            self.conn.rollback()
            return {"saved": False, "message": f"Error saving call: {e}"}


class Dirt(DBModel):
    def __init__(self):
        super().__init__()
        self.cursor.execute(
            """
                CREATE TABLE IF NOT EXISTS dirt_calls (
                    id INTEGER PRIMARY KEY,
                    call_prob REAL,
                    call_verdict INTEGER,
                    call_id INTEGER,
                    FOREIGN KEY (call_id) REFERENCES calls(id)
                )
                """
        )
        self.conn.commit()

    def findall(self):
        rows = self.cursor.execute(
            """
            SELECT call_time, call_prob, call_verdict, calls.id
            FROM dirt_calls JOIN calls 
            ON dirt_calls.call_id=calls.id
            """
        )
        self.conn.commit()
        return [
            {
                "id": row[3],
                "call_prob": row[1],
                "call_verdict": "dirty" if row[2] else "clean",
                "call_timestamp": row[0],
            }
            for row in rows
        ]

    def save(self, data):
        try:
            self.cursor.execute(
                """
                INSERT INTO dirt_calls 
                (call_prob, call_verdict, call_id) 
                VALUES (?, ?, ?)
                """,
                (data["call_prob"], data["call_verdict"], data["call_id"]),
            )
            self.conn.commit()
            return {"saved": True, "message": "Call saved successfully"}
        except sqlite3.Error as e:
            self.conn.rollback()
            return {"saved": False, "message": f"Error saving call: {e}"}


class Tear(DBModel):
    def __init__(self):
        super().__init__()
        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS tear_calls (
                id INTEGER PRIMARY KEY,
                point REAL,
                severity TEXT CHECK (severity IN ('high', 'medium', 'low')),
                call_id INTEGER,
                call_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (call_id) REFERENCES calls(id)
            )
            """
        )
        self.conn.commit()

    def findall(self):
        rows = self.cursor.execute(
            """
                SELECT point, severity, call_time
                FROM tear_calls JOIN calls 
                ON tear_calls.call_id=calls.id
            """
        )
        self.conn.commit()
        return [
            {"point": row[0], "severity": row[1], "call_time": row[2]} for row in rows
        ]

    def save(self, data_list):
        datano = 1
        try:
            for data in data_list:
                self.cursor.execute(
                    """
                INSERT INTO tear_calls 
                (point, severity, call_id) 
                VALUES (?, ?, ?)
                """,
                    (data["point"], data["severity"], data["call_id"]),
                )
                self.conn.commit()
                datano += 1
            return {"saved": True, "message": "Call saved successfully"}
        except sqlite3.Error as e:
            self.conn.rollback()
            return {
                "saved": False,
                "message": f"Error saving call: {e}",
                "error_at": datano,
            }
