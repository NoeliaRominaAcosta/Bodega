import pool from "../config/db.js";

export class VinoRepository {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM vinos");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM vinos WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  }

  static async create(vino) {
    const [result] = await pool.query(
      `INSERT INTO vinos
      (nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vino.nombre,
        vino.marca,
        vino.precioMinorista,
        vino.precioMayorista,
        vino.stock,
        vino.tipoUva,
        vino.tipoVino,
        vino.anoCosecha,
        vino.tamanoMl,
        vino.esOferta
      ]
    );

    return {
      id: result.insertId,
      ...vino
    };
  }

  static async update(id, data) {
    const vinoActual = await this.getById(id);
    if (!vinoActual) return null;

    const vinoActualizado = {
      ...vinoActual,
      ...data
    };

    await pool.query(
      `UPDATE vinos SET
      nombre = ?,
      marca = ?,
      precioMinorista = ?,
      precioMayorista = ?,
      stock = ?,
      tipoUva = ?,
      tipoVino = ?,
      anoCosecha = ?,
      tamanoMl = ?,
      esOferta = ?
      WHERE id = ?`,
      [
        vinoActualizado.nombre,
        vinoActualizado.marca,
        vinoActualizado.precioMinorista,
        vinoActualizado.precioMayorista,
        vinoActualizado.stock,
        vinoActualizado.tipoUva,
        vinoActualizado.tipoVino,
        vinoActualizado.anoCosecha,
        vinoActualizado.tamanoMl,
        vinoActualizado.esOferta,
        id
      ]
    );

    return await this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM vinos WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}