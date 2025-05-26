class Note {
  static async create({ title, content, userId }) {
    const [result] = await pool.execute(
      'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findByIdAndUserId(id, userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  }

  static async updateByIdAndUserId(id, userId, { title, content }) {
    await pool.execute(
      'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?',
      [title, content, id, userId]
    );
  }

  static async deleteByIdAndUserId(id, userId) {
    await pool.execute(
      'DELETE FROM notes WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  }
}

module.exports = Note;