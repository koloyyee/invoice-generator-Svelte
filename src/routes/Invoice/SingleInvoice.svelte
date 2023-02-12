<script lang="ts">
	import { setContext } from 'svelte';
	import { pop } from 'svelte-spa-router';
	import Button from '../../lib/components/Buttons/Button.svelte';
	import type { IInvoice } from '../../lib/interfaces/invoice.interface';
	import { additionalNote } from '../../lib/stores/invoice';
	// import { invoice } from '../../lib/util/emptyState';

	import Form from './Form.svelte';
	import PreviewInvoice from './PreviewInvoice.svelte';

	let invoices: IInvoice[] = JSON.parse(localStorage.getItem('invoices'));

	$: isEditing = false;
	export let params = { invoiceId: '' };

	let invoice = invoices.find(
		(invoice) => invoice.invoiceId === params.invoiceId
	);

	const printInvoice = () => {
		window.print();
	};

	const backPage = () => {
		pop();
	};

	const toggleEditing = () => {
		isEditing = !isEditing;
	};

	const updateInvoice = async () => {
		if (
			invoice.issuer.username === '' ||
			invoice.issuer.email === '' ||
			invoice.issuer.bankName === '' ||
			invoice.issuer.bankHolder === '' ||
			invoice.issuer.bankAccount === '' ||
			invoice.issuer.address === '' ||
			invoice.customer.name === '' ||
			invoice.customer.address === '' ||
			invoice.items.length === 0 ||
			invoice.totalAmount === 0
		)
			return;

		additionalNote.set(invoice.note);

		try {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_API}/invoices/${invoice.invoiceId}`,
				{
					method: 'PATCH',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(invoice),
				}
			);
			console.log(res.status);
		} catch (error) {
			console.log(error.message);
		}
		isEditing = false;
	};

	setContext('invoiceData', {
		invoice: invoice,
	});
</script>

<div class="sm:grid lg:grid grid-cols-2 ">
	{#if invoice}
		{#if isEditing}
			<Form invoice="{invoice}" />
		{/if}

		<section
			class="invoice-preview rounded border-2 shadow-md p-5 m-5 flex flex-col gap-5 "
		>
			<div class="not-printable flex justify-center">
				<Button func="{printInvoice}" text="{'Print'}" class="success" />
				{#if isEditing}
					<Button func="{updateInvoice}" text="{'Update'}" class="primary" />
					<Button func="{toggleEditing}" text="{'Cancel'}" class="error" />
				{:else}
					<Button func="{toggleEditing}" text="{'Edit'}" class="secondary" />
				{/if}
			</div>

			<PreviewInvoice invoice="{invoice}" />
		</section>
	{/if}
</div>

<Button func="{backPage}" text="{'Back'}" class="warning justify-self-end" />
