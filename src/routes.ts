import { wrap } from 'svelte-spa-router/wrap';

export default {
  '/': wrap({
    asyncComponent: ()=> import('./routes/Dashboard/index.svelte'),
  }),
  '/auth': wrap({
    asyncComponent: ()=> import('./routes/Auth/index.svelte'),
  }),
  '/invoice/': wrap({
    asyncComponent: ()=> import('./routes/Invoice/index.svelte'),
  }),
  '/invoice/new': wrap({
    asyncComponent: ()=> import('./routes/Invoice/NewInvoice.svelte'),
  }),
  '/invoice/:invoiceId': wrap({
    asyncComponent: ()=> import('./routes/Invoice/SingleInvoice.svelte'),
  }),

  '/user/settings': wrap({
    asyncComponent: ()=> import('./routes/User/index.svelte'),
  }),

};
