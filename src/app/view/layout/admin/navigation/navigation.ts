import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  icon2?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/home',
    icon: '/assets/icon/custom-icons/dashboard.png',
    classes: 'nav-item',
  },
  {
    id: 'about-us',
    title: 'About Us',
    type: 'group',
    children: [
      {
        id: 'Who-we-are',
        title: 'Who we are',
        type: 'item',
        url: '/view/pages/about-us/who-we-are',
        icon: '/assets/icon/custom-icons/candle-2-wh.svg',
        classes: 'nav-item',
      },
      {
        id: 'vision-and-mission',
        title: 'Vision & mission',
        type: 'item',
        url: '/view/pages/about-us/vision-and-mission',
        icon: '/assets/icon/custom-icons/candle-2-wh.svg',
        classes: 'nav-item',
      },
      {
        id: 'vision-and-mission',
        title: 'Our Value',
        type: 'item',
        url: '/view/pages/about-us/our-value',
        icon: '/assets/icon/custom-icons/candle-2-wh.svg',
        classes: 'nav-item',
      },
      // {
      //   id: 'Who-we-are',
      //   title: 'Who we are',
      //   type: 'item',
      //   url: '/view/pages/about-us',
      //   icon: '/assets/icon/custom-icons/candle-2-wh.svg',
      //   classes: 'nav-item',
      // },
      // {
      //   id: 'Who-we-are',
      //   title: 'Who we are',
      //   type: 'item',
      //   url: '/view/pages/about-us',
      //   icon: '/assets/icon/custom-icons/candle-2-wh.svg',
      //   classes: 'nav-item',
      // },
    ],
  },
  // {
  //   id: 'basic',
  //   title: 'Component',
  //   type: 'collapse',
  //   icon: '/assets/icon/custom-icons/candle-2-gr.svg',
  //   icon2: '/assets/icon/custom-icons/candle-2-wh.svg',
  //   children: [
  //     {
  //       id: 'button',
  //       title: 'Button',
  //       type: 'item',
  //       url: '/basic/button',
  //     },
  //   ],
  // },

  {
    id: 'ads',
    title: 'Ads',
    type: 'item',
    url: '/view/pages/ads',
    icon: '/assets/icon/custom-icons/ads.png',
    classes: 'nav-item',
  },
  // {
  //   id: 'orders',
  //   title: 'Orders',
  //   type: 'item',
  //   url: '/view/pages/orders',
  //   icon: '/assets/icon/custom-icons/orders.png',
  //   classes: 'nav-item',
  // },
  {
    id: 'tips',
    title: 'tips',
    type: 'item',
    url: '/view/pages/tips',
    icon: '/assets/icon/custom-icons/tips.png',
    classes: 'nav-item',
  },
  {
    id: 'reviews',
    title: 'reviews',
    type: 'item',
    url: '/view/pages/reviews',
    icon: '/assets/icon/custom-icons/reviews.png',
    classes: 'nav-item',
  },
  // {
  //   id: 'invoices',
  //   title: 'invoices',
  //   type: 'item',
  //   url: '/view/pages/invoices',
  //   icon: '/assets/icon/custom-icons/invoices.png',
  //   classes: 'nav-item',
  // },
  {
    id: 'categories',
    title: 'categories',
    type: 'item',
    url: '/view/pages/categories',
    icon: '/assets/icon/custom-icons/categories.png',
    classes: 'nav-item',
  },
  {
    id: 'management',
    title: 'Management',
    type: 'group',
    children: [
      {
        id: 'department',
        title: 'Department',
        type: 'item',
        url: '/view/pages/management/departments',
        icon: '/assets/icon/custom-icons/candle-2-wh.svg',
        classes: 'nav-item',
      },
      // {
      //   id: 'Who-we-are',
      //   title: 'Who we are',
      //   type: 'item',
      //   url: '/view/pages/about-us',
      //   icon: '/assets/icon/custom-icons/candle-2-wh.svg',
      //   classes: 'nav-item',
      // },
      // {
      //   id: 'Who-we-are',
      //   title: 'Who we are',
      //   type: 'item',
      //   url: '/view/pages/about-us',
      //   icon: '/assets/icon/custom-icons/candle-2-wh.svg',
      //   classes: 'nav-item',
      // },
    ],
  },
  // {
  //   id: 'packages',
  //   title: 'packages',
  //   type: 'item',
  //   url: '/view/pages/packages',
  //   icon: '/assets/icon/custom-icons/packages.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'products',
  //   title: 'products',
  //   type: 'item',
  //   url: '/view/pages/products',
  //   icon: '/assets/icon/custom-icons/products.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'customers',
  //   title: 'customers',
  //   type: 'item',
  //   url: '/view/pages/customers',
  //   icon: '/assets/icon/custom-icons/customers.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'employees',
  //   title: 'employees',
  //   type: 'item',
  //   url: '/view/pages/employees',
  //   icon: '/assets/icon/custom-icons/employees.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'chats',
  //   title: 'chats',
  //   type: 'item',
  //   url: '/view/pages/chats',
  //   icon: '/assets/icon/custom-icons/chats.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'emails',
  //   title: 'emails',
  //   type: 'item',
  //   url: '/view/pages/emails',
  //   icon: '/assets/icon/custom-icons/emails.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'role-permission',
  //   title: 'role-permission',
  //   type: 'item',
  //   url: '/view/pages/role-permission',
  //   icon: '/assets/icon/custom-icons/role-permission.png',
  //   classes: 'nav-item',
  // },
  // {
  //   id: 'navigation',
  //   title: 'Navigation',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'dashboard',
  //       title: 'Dashboard',
  //       type: 'item',
  //       url: '/dashboard',
  //       icon: 'feather icon-home',
  //       classes: 'nav-item',
  //     },
  //     {
  //       id: 'dashboard',
  //       title: 'Dashboard',
  //       type: 'item',
  //       url: '/dashboard',
  //       icon: 'feather icon-home',
  //       classes: 'nav-item',
  //     },
  //   ],
  // },
  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button',
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges',
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging',
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse',
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills',
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text',
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server',
  //     },
  //   ],
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'apexChart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: 'apexchart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart',
  //     },
  //   ],
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/login',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar',
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true,
  //     },
  //     {
  //       id: 'buy_now',
  //       title: 'Buy Now',
  //       type: 'item',
  //       icon: 'feather icon-book',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.com/item/datta-able-angular/',
  //       target: true,
  //       external: true,
  //     },
  //   ],
  // },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
