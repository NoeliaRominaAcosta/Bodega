export class ItemPedido {
  constructor(idProducto, cantidad, precioUnitario) {
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }

  get subtotal() {
    return this.cantidad * this.precioUnitario;
  }
}
