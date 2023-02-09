<script lang="ts">
    import CustomerInfo from "../../lib/components/Preview/CustomerInfo.svelte";
    import Issuer from "../../lib/components/Preview/Issuer.svelte";
    import Note from "../../lib/components/Preview/Note.svelte";
    import TotalAmount from "../../lib/components/Preview/TotalAmount.svelte";
    import ItemTable from "../../lib/components/Table/ItemTable.svelte";
    import type { IInvoice } from "../../lib/interfaces/invoice.interface";

    export let invoice: IInvoice;
</script>

<section class="flex justify-between">
    <Issuer bind:issuer={invoice.issuer} />

    <h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
</section>

<!-- Print Button -->
<!-- Client's info -->
<CustomerInfo
    bind:invoiceId={invoice.invoiceId}
    bind:invoiceDate={invoice.invoiceDate}
    bind:invoiceDueDate={invoice.invoiceDueDate}
    bind:client={invoice.client}
    bind:status={invoice.status}
/>
<!-- Item list -->

<ItemTable bind:items={invoice.items} />

<!-- Total Amount -->
<div class="mt-auto">
    <TotalAmount bind:totalAmount={invoice.totalAmount} />

    <Note bind:note={invoice.note} />
</div>

