import { Routes } from '@angular/router';
import { TableComponent } from './table/table';
import { AdvancedComponent } from './advanced/advanced';
import { SimpleComponent } from './simple/simple';

export const routes: Routes = [
  {
    path: '',
    component: SimpleComponent,
  },
  {
    path: 'advanced',
    component: AdvancedComponent,
  },
  {
    path: 'page-a',
    component: TableComponent,
  },
  {
    path: 'page-b',
    component: TableComponent,
  },
];
