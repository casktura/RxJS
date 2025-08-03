import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class TableComponent {
  api = inject(ApiService);
  customers$ = this.api.getCustomer();
}
