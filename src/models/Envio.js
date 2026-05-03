export class Envio {
  constructor(id, idPedido, direccion, fechaEnvio = null, estado = 'PENDIENTE') {
    this.id = id;
    this.idPedido = idPedido;
    this.direccion = direccion;
    this.fechaEnvio = fechaEnvio;
    this.estado = estado;
    this.tipo = 'BASE';
  }

  // Método que será sobrescrito por las subclases (Polimorfismo)
  calcularFechaEstimada() {
    return null;
  }

  despachar() {
    this.fechaEnvio = new Date().toISOString();
    this.estado = 'DESPACHADO';
  }

  entregar() {
    this.estado = 'ENTREGADO';
  }
}
