<script lang="ts">
	import type { IInvoice } from "../../interfaces/invoice.interface";
	import { InvoiceStatus } from '../../interfaces/invoice.interface';

	export let invoiceId: string;
	export let invoiceDate: string;
	export let 	invoiceDueDate: string;
	export let status: IInvoice['status'];

	const statusEnum = Array(Object.freeze(InvoiceStatus));
	
</script>

<div class="flex flex-col mt-3">
	<label for="invoiceId">Invoice's number</label>
	<input
		class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10 text-gray-500"
		type="text"
		name="invoiceId"
		id="invoiceId"
		bind:value={invoiceId}
		disabled = {true}
		required
	/>

	<label for="invoiceDate">Invoice issue date</label>
	<input
		class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
		type="date"
		name="invoiceDate"
		id="invoiceDate"
		bind:value={invoiceDate}
		required
	/>

	<label for="invoiceDueDate">Invoice due date</label>
	<input
		class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
		type="date"
		name="invoiceDueDate"
		id="invoiceDueDate"
		bind:value={invoiceDueDate}
		required
	/>

	<label for="invoiceDueDate">Invoice status</label>
	<select class='rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10 ' name="status" id="" bind:value={status}>
		{#each statusEnum as statusE}
			<option value={statusE.NOT_PAID}>{statusE.NOT_PAID}</option>
			<option value={statusE.PAID}>{statusE.PAID}</option>
			<option value={statusE.VOID}>{statusE.VOID}</option>
		{/each}
	</select>
</div>
