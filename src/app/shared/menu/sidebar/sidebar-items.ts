// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string,
  badgeType?: string;
  badgeValue?: string;
  children?: Menu[];
}

export const MenuItemsAdmin: Menu[] = [
  {
    path: '/dashboard/admin', title: 'Dashboard', icon: 'icon-desktop', type: 'link'
  },
  {
    title: 'Management', icon: 'icon-package', type: 'sub', children: [
      { path: '/service_provider/list', title: 'Service Provider Management', type: 'link' },
      { path: '/customers/list', title: 'Customers Management', type: 'link' }
    ]
  },

  {
    headTitle: 'Reports'
  },
  {
    title: 'Service Provider', icon: 'icon-files', type: 'sub', children: [
      { path: '/report/booking_wise', title: 'Booking Wise Report', type: 'link' },
      { path: '/report/rating_wise', title: 'Rating Wise Report', type: 'link' },
   
    ]
  },
  
]


export const MenuItemsCustomer: Menu[] = [
 
];
