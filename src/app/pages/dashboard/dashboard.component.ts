import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { PedidosService } from '../../services/pedidos/pedidos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  stats = {
    totalPedidos: 0,
    completados: 0,
    pendientes: 0
  };

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    this.pedidosService.obtenerPedidos().subscribe((pedidos: any) => {

      this.stats.totalPedidos = pedidos.length;
      this.stats.completados = pedidos.filter((p: any) => p.estado === 'COMPLETADO').length;
      this.stats.pendientes = pedidos.filter((p: any) => p.estado === 'PENDIENTE').length;

      this.graficarEstados();
      this.graficarDias(pedidos);
    });
  }

  graficarEstados() {
    new Chart("chartEstados", {
      type: 'pie',
      data: {
        labels: ['Completados', 'Pendientes'],
        datasets: [{
          data: [this.stats.completados, this.stats.pendientes],
          backgroundColor: ['#16a34a', '#facc15']
        }]
      }
    });
  }

  graficarDias(pedidos: any[]) {
    const agrupados: any = {};

    pedidos.forEach(p => {
      const fecha = p.fechaPedido.split('T')[0];
      agrupados[fecha] = (agrupados[fecha] || 0) + 1;
    });

    new Chart("chartDias", {
      type: 'line',
      data: {
        labels: Object.keys(agrupados),
        datasets: [{
          label: "Pedidos por día",
          data: Object.values(agrupados),
          borderColor: "#3b82f6",
          fill: false
        }]
      }
    });
  }
}
