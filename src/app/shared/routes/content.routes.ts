import { Routes, RouterModule } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'service_provider',
    loadChildren: './pages/service-provider/service-provider.module#ServiceProvidersModule'
  },
  {
    path: 'customers',
    loadChildren: './pages/customers/customers.module#CustomersModule'
  },
  {
    path: 'report',
    loadChildren: './pages/reports/reports.module#ReportsModule'
  },

];
