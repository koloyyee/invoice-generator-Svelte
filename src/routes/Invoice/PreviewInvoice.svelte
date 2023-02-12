<script lang="ts">
	import CustomerInfo from '../../lib/components/Preview/CustomerInfo.svelte';
	import Issuer from '../../lib/components/Preview/Issuer.svelte';
	import Note from '../../lib/components/Preview/Note.svelte';
	import TotalAmount from '../../lib/components/Preview/TotalAmount.svelte';
	import ItemTable from '../../lib/components/Table/ItemTable.svelte';
	import type { IInvoice } from '../../lib/interfaces/invoice.interface';

	export let invoice: IInvoice;
</script>

<section class="flex justify-between">
	<Issuer bind:issuer="{invoice.issuer}" />

	<h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
</section>

<CustomerInfo
	invoiceId="{invoice.invoiceId}"
	createdDate="{invoice.createdDate}"
	dueDate="{invoice.dueDate}"
	client="{invoice.customer}"
	status="{invoice.status}"
/>

<ItemTable items="{invoice.items}" />

<div class="mt-auto">
	<TotalAmount totalAmount="{invoice.totalAmount}" />

	<Note note="{invoice.note}" />
</div>
