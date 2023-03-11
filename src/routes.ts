import { wrap } from 'svelte-spa-router/wrap';

export default {
  '/': wrap({
    asyncComponent: () => import('./routes/dashboard/index.svelte'),
  }),
  '/auth': wrap({
    asyncComponent: () => import('./routes/auth/index.svelte'),
  }),
  '/invoice/': wrap({
    asyncComponent: () => import('./routes/invoice/index.svelte'),
  }),
  '/invoice/new': wrap({
    asyncComponent: () => import('./routes/invoice/new.svelte'),
  }),
  '/invoice/:invoiceId': wrap({
    asyncComponent: () => import('./routes/invoice/single.svelte'),
  }),

  '/user/settings': wrap({
    asyncComponent: () => import('./routes/user/update.svelte'),
  }),
  '/customer/new': wrap({
    asyncComponent: () => import('./routes/customer/new.svelte'),
  }),
};
