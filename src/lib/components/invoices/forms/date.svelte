<script lang="ts">
  import type { IInvoice } from '../../../interfaces';
  import { invoiceStatus } from '../../../util/status';

  export let invoiceId: string;
  export let createdDate: string;
  export let dueDate: string;
  export let status: IInvoice['status'];

  const statusEnum = Array(Object.freeze(invoiceStatus));
</script>

<div class="flex flex-col mt-3">
  <label for="invoiceId">Invoice's number</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10 text-gray-500"
    type="text"
    name="invoiceId"
    id="invoiceId"
    disabled={true}
    bind:value={invoiceId}
    required
  />

  <label for="invoiceDate">Invoice issue date</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="date"
    name="createdDate"
    id="createdDate"
    bind:value={createdDate}
    required
  />

  <label for="invoiceDueDate">Invoice due date</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="date"
    name="dueDate"
    id="dueDate"
    bind:value={dueDate}
    required
  />

  <label for="invoiceDueDate">Invoice status</label>
  <select
    class=" rounded-xl select hover:select-primary w-full shadow"
    name="status"
    id=""
    bind:value={status}
  >
    {#each statusEnum as statusE}
      <option value={statusE.NOT_PAID}>{statusE.NOT_PAID}</option>
      <option value={statusE.PAID}>{statusE.PAID}</option>
      <option value={statusE.VOID}>{statusE.VOID}</option>
    {/each}
  </select>
</div>
