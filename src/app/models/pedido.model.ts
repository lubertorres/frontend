export interface PedidoDetalle {
  productoID: string;
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
}

export interface Pedido {
  pedidoID: string;
  clienteFK: number;
  fechaPedido: string;
  total: number;
  detalles: PedidoDetalle[];
}
