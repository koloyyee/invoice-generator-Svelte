<script lang="ts">
  import type { ICustomer } from '../../interfaces/customer.interface';
  import type { IInvoice } from '../../interfaces/invoice.interface';

  export let client: ICustomer = {
    name: '',
    address: '',
    email: "",
    phone: '',
  };
  export let status: IInvoice['status'];
  export let invoiceId = '';
  export let createdDate = new Date().toLocaleDateString();
  export let dueDate = new Date().toLocaleDateString();
</script>

<article class="info-section grid grid-cols-2">
  <div class="client-info">
    <h5 class="font-bold mt-2 text-sm">Bill to:</h5>
    <h3 class="font-bold text-2xl">{client.name}</h3>
    <p class=" w-2/3">{client.address}</p>
    <p class=" w-2/3">{client.email}</p>
    <p class=" w-2/3">{client.phone}</p>
  </div>
  <!-- Invoice info -->
  <div class="invoice-info text-sm text-right">
    <ul>
      <li>
        Invoice status: <span
          class="status font-bold underline underline-offset-4 {status ===
          'Paid'
            ? 'text-green-600'
            : status === 'Not Paid'
            ? 'text-red-600'
            : 'text-orange-400'}">{status}</span
        >
      </li>
      <li>
        Invoice number: <span
          class="status font-bold underline underline-offset-4"
          >{invoiceId}</span
        >
      </li>
      <li>
        Issue date: <span class="status font-bold underline underline-offset-4">
          {createdDate}</span
        >
      </li>
      <li>
        Due date: <span class="status font-bold underline underline-offset-4"
          >{dueDate}</span
        >
      </li>
    </ul>
  </div>
</article>
