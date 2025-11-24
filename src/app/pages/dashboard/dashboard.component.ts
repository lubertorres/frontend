import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';

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
    pendientes: 0,
    clientesActivos: 0
  };

  actividadLabels: string[] = [];
  actividadValues: number[] = [];

  constructor(private dashService: DashboardService) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.dashService.obtenerEstadisticas().subscribe(resp => {
      console.log('DASHBOARD API:', resp);

      this.stats.totalPedidos = resp.totales;

      this.stats.completados =
        resp.estados.find((x: any) => x.estado === 'COMPLETADO')?.cantidad || 0;

      this.stats.pendientes =
        resp.estados.find((x: any) => x.estado === 'PENDIENTE')?.cantidad || 0;

      this.stats.clientesActivos = resp.clientes[0]?.clientesActivos || 0;

      this.actividadLabels = resp.actividad.map((a: any) => a.fecha);
      this.actividadValues = resp.actividad.map((a: any) => a.total);

      this.graficarEstados();
      this.graficarDias();
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

  graficarDias() {
    new Chart("chartDias", {
      type: 'line',
      data: {
        labels: this.actividadLabels,
        datasets: [{
          label: "Pedidos por día",
          data: this.actividadValues,
          borderColor: "#3b82f6",
          fill: false
        }]
      }
    });
  }
}
