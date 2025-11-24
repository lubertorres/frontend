import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'http://localhost:8000/api/dashboard/estadisticas';

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<any> {
    return this.http.get<any>(this.api);
  }
}
