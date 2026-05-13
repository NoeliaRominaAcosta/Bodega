import pool from "../config/db.js";

export class DetallePedidoRepository {
    
    static async getAll() {

  const [rows] = await pool.query(`
    SELECT
      dp.id_detalle AS id,
      dp.cantidad,
      dp.precio_unitario,
      dp.subtotal,
      p.id_pedido,
      v.nombre AS vino
    FROM detalle_pedido dp
    JOIN pedido p
    ON dp.id_pedido = p.id_pedido
    JOIN vino v
    ON dp.id_vino = v.id_vino
  `);

  return rows;
}

  static async create(detalle) {
    const subtotal = detalle.cantidad * detalle.precio_unitario;

    const [result] = await pool.query(
      `INSERT INTO detalle_pedido
      (id_pedido, id_vino, cantidad, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?)`,
      [
        detalle.id_pedido,
        detalle.id_vino,
        detalle.cantidad,
        detalle.precio_unitario,
        subtotal
      ]
    );

    await pool.query(
  `UPDATE pedido
   SET total = (
     SELECT SUM(subtotal)
     FROM detalle_pedido
     WHERE id_pedido = ?
   )
   WHERE id_pedido = ?`,
  [detalle.id_pedido, detalle.id_pedido]
);

    return {
      id: result.insertId,
      ...detalle,
      subtotal
    };
  }
}