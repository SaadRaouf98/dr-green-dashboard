import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  {
    id: 'categories',
    title: 'Categories',
    type: 'item',
    icon: 'layers',
    url: 'dashboard/categories'
  },
  {
    id: 'brands',
    title: 'Brands',
    type: 'item',
    icon: 'award',
    url: 'dashboard/sub-categories'
  },

  {
    id: 'stores',
    title: 'Stores',
    type: 'item',
    icon: 'trello',
    url: 'dashboard/stores'
  },
  {
    id: 'slider',
    title: 'Slider',
    type: 'item',
    icon: 'list',
    url: 'dashboard/slider'
  },

  {
    id: 'attributes',
    title: 'Specs',
    type: 'item',
    icon: 'git-commit',
    url: 'dashboard/attributes'
  },
  {
    id: 'products-addition',
    title: 'Add Products',
    type: 'item',
    icon: 'plus-square',
    url: 'dashboard/products-addition'
  },
  {
    id: 'products-low',
    title: 'Low Quantity',
    type: 'item',
    icon: 'alert-triangle',
    url: 'dashboard/show-products-low'
  },
  {
    id: 'all-products-show',
    title: 'All Products',
    type: 'item',
    icon: 'aperture',
    url: 'dashboard/all-products-show'
  },
  // {
  //   id: 'vendors',
  //   title: 'Vendors',
  //   type: 'item',
  //   icon: 'user',
  //   url: 'dashboard/vendors'
  // },
  // {
  //   id: 'checkout-cart-vendors',
  //   title: 'Vendors Cart',
  //   type: 'item',
  //   icon: 'shopping-cart',
  //   url: 'dashboard/checkout-cart-vendors'
  // },
  // {
  //   id: 'order-page',
  //   title: 'Vendors Orders',
  //   type: 'item',
  //   icon: 'truck',
  //   url: 'dashboard/order-page'
  // },
  // {
  //   id: 'vendors-transaction-page',
  //   title: 'Vendors Transaction',
  //   type: 'item',
  //   icon: 'trending-down',
  //   url: 'dashboard/vendors-transaction-page'
  // },
  {
    id: 'vendor',
    title: 'Vendors',
    type: 'collapsible',
    icon: 'users',
    badge: {
      title: '4',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'vendors',
        title: 'Vendors',
        type: 'item',
        icon: 'user',
        url: 'dashboard/vendors'
      },
      {
        id: 'checkout-cart-vendors',
        title: 'Cart',
        type: 'item',
        icon: 'shopping-cart',
        url: 'dashboard/checkout-cart-vendors'
      },
      {
        id: 'order-page',
        title: 'Orders',
        type: 'item',
        icon: 'truck',
        url: 'dashboard/order-page'
      },
      {
        id: 'vendors-transaction-page',
        title: 'Transactions',
        type: 'item',
        icon: 'trending-down',
        url: 'dashboard/vendors-transaction-page'
      },
    ]
  },
  {
    id: 'dashboard-customers',
    title: 'Customers',
    type: 'collapsible',
    icon: 'users',
    badge: {
      title: '4',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'customers-list',
        title: 'Dashboard Customers',
        type: 'item',
        icon: 'user',
        url: 'dashboard/dashboard-customers'
      },
      {
        id: 'checkout-cart',
        title: 'Cart',
        type: 'item',
        icon: 'shopping-cart',
        url: 'dashboard/checkout-cart'
      },
      {
        id: 'dashboard-customers-order',
        title: 'Orders',
        type: 'item',
        icon: 'truck',
        url: 'dashboard/dashboard-customers-order'
      },
      {
        id: 'dashboard-customers-transaction',
        title: 'Transactions',
        type: 'item',
        icon: 'trending-up',
        url: 'dashboard/dashboard-customers-transaction'
      },
    ]
  },
  {
    id: 'website-customers',
    title: 'Website Customers',
    type: 'collapsible',
    icon: 'users',
    badge: {
      title: '2',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'website-customers',
        title: 'Website Customers',
        type: 'item',
        icon: 'user',
        url: 'dashboard/website-customers'
      },
      {
        id: 'website-customers-order',
        title: 'Orders',
        type: 'item',
        icon: 'truck',
        url: 'dashboard/website-customers-order'
      },
    ]
  },
  {
    id: 'coupon',
    title: 'Coupons',
    type: 'item',
    icon: 'tag',
    url: 'dashboard/coupon'
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    type: 'item',
    icon: 'phone-call',
    url: 'dashboard/contact-us'
  },
  {
    id: 'wishlist',
    title: 'Most Wishlist',
    type: 'item',
    icon: 'heart',
    url: 'dashboard/wishlist'
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    type: 'item',
    icon: 'mail',
    url: 'dashboard/newsletter'
  },
  {
    id: 'faq',
    title: 'FAQS',
    type: 'item',
    icon: 'at-sign',
    url: '/apps/invoice/faq'
  },

];
