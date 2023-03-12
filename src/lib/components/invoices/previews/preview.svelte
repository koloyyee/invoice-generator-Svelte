<script lang="ts">
  import type { IInvoice } from '../../../interfaces/index';
  import { logo } from '../../../stores/invoice';
  import ItemTable from '../forms/item-table.svelte';
  import Note from './additional-note.svelte';
  import CustomerInfo from './customer-info.svelte';
  import Issuer from './issuer.svelte';
  import TotalAmount from './total-amount.svelte';

  export let invoice: IInvoice;
</script>

<section class="flex justify-between">
  <Issuer bind:issuer={invoice.issuer} />

  <h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
  {@debug $logo}
  {#if $logo}
    <img src={$logo} alt={$logo} />
  {/if}
</section>

<CustomerInfo
  bind:invoiceId={invoice.invoiceId}
  bind:createdDate={invoice.createdDate}
  bind:dueDate={invoice.dueDate}
  bind:client={invoice.customer}
  bind:status={invoice.status}
/>

<ItemTable bind:items={invoice.items} />

<div class="mt-auto">
  <TotalAmount bind:totalAmount={invoice.totalAmount} />

  <Note bind:note={invoice.note} />
</div>
