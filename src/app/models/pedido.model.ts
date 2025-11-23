export interface PedidoDetalle {
  productoID: number;
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
}

export interface Pedido {
  pedidoID: number;
  clienteFK: number;
  fechaPedido: string;
  total: number;
  detalles: PedidoDetalle[];
}
