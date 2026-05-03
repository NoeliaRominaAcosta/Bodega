export class Pedido {
  constructor(id, idCliente, fecha, items = [], total = 0, estado = 'PENDIENTE') {
    this.id = id;
    this.idCliente = idCliente;
    this.fecha = fecha;
    this.items = items; // Array de ItemPedido
    this.total = total;
    this.estado = estado;
  }

  agregarItem(item) {
    this.items.push(item);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}
