import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMSADM: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Features',
    group: true,
  },
  {
    title: 'Manage Centre',
    icon: 'nb-tables',
    link: '/pages/manage'

  },
  {
    title: 'Manage User',
    icon: 'nb-tables',
    link: '/pages/user'

  },
  {
    title: 'Add Booking',
    icon: 'nb-compose',
    children: [
      {
        title: 'Pickup and Dropoff',
        link: '/pages/add-booking/Servicing',
      },
      {
        title: 'Chauffeur',
        link: '/pages/add-booking/Chauffeur',
      },
      {
        title: 'RSA',
        link: '/pages/add-booking/RSA',
      },
    ],
  },
  {
    title: 'Active',
    icon: 'nb-skip-forward',
    children: [
      {
        title: 'Pickup',
        link: '/pages/Active/pickup',
      },
      {
        title: 'At Centre',
        link: '/pages/Active/at-centre',
      },
      {
        title: 'Drop-off',
        link: '/pages/Active/drop-off',
      },
      {
        title: 'RSA',
        link: '/pages/Active/rsa',
      },
      {
        title: 'Chauffeur',
        link: '/pages/Active/chauffeur',
      }
    ],
  },
  {
    title: 'Upcoming Booking',
    icon: 'nb-tables',
    link: '/pages/upcoming',
  },
  {
    title: 'Paused',
    icon: 'nb-pause',
    link: '/pages/paused',
  },
  {
    title: 'Cancelled',
    icon: 'nb-close',
    link: '/pages/cancelled',
  },
  {
    title: 'Completed',
    icon: 'nb-locked',
    link: '/pages/completed',
  },
  {
    title: 'Mishaps',
    icon: 'nb-alert',
    link: '/pages/mishaps'
  },

  {
    title: 'Reports',
    icon: 'nb-tables',
    link: '/pages/reports'

  },
  {
    title: 'Settlement Advice',
    icon: 'nb-tables',
    link: '/pages/payment',
    hidden:false

  },
  {
    title: 'Unconfirmed',
    icon: 'nb-tables',
    link: '/pages/unconfirmed',
  },
  {
    title: 'Cre Reports',
    icon: 'nb-tables',
    link: '/pages/cre-reports',
  },

  {
    title: 'Escalation Matrix',
    icon: 'nb-tables',
    link: '/pages/matrix',
  }
];

export const MENU_ITEMSUSR: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Features',
    group: true,
  },
  {
    title: 'Manage Centre',
    icon: 'nb-tables',
    link: '/pages/manage'

  },
  {
    title: 'Manage User',
    icon: 'nb-tables',
    link: '/pages/user'

  },
  {
    title: 'Add Booking',
    icon: 'nb-compose',
    children: [
      {
        title: 'Pickup and Dropoff',
        link: '/pages/add-booking/Servicing',
      },
      {
        title: 'Chauffeur',
        link: '/pages/add-booking/Chauffeur',
      },
      {
        title: 'RSA',
        link: '/pages/add-booking/RSA',
      },
    ],
  },
  {
    title: 'Active',
    icon: 'nb-skip-forward',
    children: [
      {
        title: 'Pickup',
        link: '/pages/Active/pickup',
      },
      {
        title: 'At Centre',
        link: '/pages/Active/at-centre',
      },
      {
        title: 'Drop-off',
        link: '/pages/Active/drop-off',
      },
      {
        title: 'RSA',
        link: '/pages/Active/rsa',
      },
      {
        title: 'Chauffeur',
        link: '/pages/Active/chauffeur',
      }
    ],
  },
  {
    title: 'Upcoming Booking',
    icon: 'nb-tables',
    link: '/pages/upcoming',
  },
  {
    title: 'Paused',
    icon: 'nb-pause',
    link: '/pages/paused',
  },
  {
    title: 'Cancelled',
    icon: 'nb-close',
    link: '/pages/cancelled',
  },
  {
    title: 'Completed',
    icon: 'nb-locked',
    link: '/pages/completed',
  },
  {
    title: 'Mishaps',
    icon: 'nb-alert',
    link: '/pages/mishaps'
  },

  {
    title: 'Reports',
    icon: 'nb-tables',
    link: '/pages/reports'

  },
  {
    title: 'Settlement Advice',
    icon: 'nb-tables',
    link: '/pages/payment',
    hidden:true

  },
  {
    title: 'Unconfirmed',
    icon: 'nb-tables',
    link: '/pages/unconfirmed',
  },
  {
    title: 'Cre Reports',
    icon: 'nb-tables',
    link: '/pages/cre-reports',
  },

  {
    title: 'Escalation Matrix',
    icon: 'nb-tables',
    link: '/pages/matrix',
  }
];

export const MENU_INSURANCESUSR: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Features',
    group: true,
  },
  {
    title: 'Manage Centre',
    icon: 'nb-tables',
    link: '/pages/manage'

  },
  {
    title: 'Manage User',
    icon: 'nb-tables',
    link: '/pages/user'

  },
  {
    title: 'Add Booking',
    icon: 'nb-compose',
    children: [
      {
        title: 'Pickup and Dropoff',
        link: '/pages/add-booking/Servicing',
      },
      {
        title: 'RSA',
        link: '/pages/add-booking/RSA',
      },
    ],
  },
  {
    title: 'Active',
    icon: 'nb-skip-forward',
    children: [
      {
        title: 'Pickup',
        link: '/pages/Active/pickup',
      },
      {
        title: 'At Centre',
        link: '/pages/Active/at-centre',
      },
      {
        title: 'Drop-off',
        link: '/pages/Active/drop-off',
      },
      {
        title: 'RSA',
        link: '/pages/Active/rsa',
      }
    ],
  },
  {
    title: 'Upcoming Booking',
    icon: 'nb-tables',
    link: '/pages/upcoming',
  },
  {
    title: 'Paused',
    icon: 'nb-pause',
    link: '/pages/paused',
  },
  {
    title: 'Cancelled',
    icon: 'nb-close',
    link: '/pages/cancelled',
  },
  {
    title: 'Completed',
    icon: 'nb-locked',
    link: '/pages/completed',
  },
  {
    title: 'Mishaps',
    icon: 'nb-alert',
    link: '/pages/mishaps'
  },
  {
    title: 'Settlement Advice',
    icon: 'nb-tables',
    link: '/pages/payment',
    hidden:true

  },
  {
    title: 'Reports',
    icon: 'nb-tables',
    link: '/pages/reports'

  },
  {
    title: 'Unconfirmed',
    icon: 'nb-tables',
    link: '/pages/unconfirmed',
  }
];

