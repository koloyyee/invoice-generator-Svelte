<script lang="ts">
	import { createForm } from 'felte';
	import Button from '../../lib/components/Buttons/Button.svelte';
	import CustomerInfo from '../../lib/components/Invoice/CustomerInfo.svelte';
	import Dates from '../../lib/components/Invoice/Dates.svelte';
	import IssuerInfo from '../../lib/components/Invoice/IssuerInfo.svelte';
	import Note from '../../lib/components/Invoice/Note.svelte';
	import CustomerInfoPreview from '../../lib/components/Preview/CustomerInfo.svelte';
	import Issuer from '../../lib/components/Preview/Issuer.svelte';
	import NotePreview from '../../lib/components/Preview/Note.svelte';
	import TotalAmount from '../../lib/components/Preview/TotalAmount.svelte';
	import ItemInputs from '../../lib/components/Table/ItemInputs.svelte';
	import ItemTable from '../../lib/components/Table/ItemTable.svelte';
	import type { IItem } from '../../lib/interfaces';
	import { currentUser } from '../../lib/stores/auth';
	import { additionalNote } from '../../lib/stores/invoice';
	import { invoice } from '../../lib/util/emptyState';

	// TODO! Refactor to felte!
	// Issuer's info value
	additionalNote.subscribe((value) => {
		invoice.note = value;
	});

	const user = $currentUser ?? JSON.parse(localStorage.getItem('appUser'));
	const { form, errors, data } = createForm({
		initialValues: {
			issuer: {
				username: user.username ?? '',
				email: user.email ?? '',
				phone: user.phone ?? '',
				website: user.website ?? '',
				address: user.address ?? '',
				bankName: user.bankName ?? '',
				bankAccount: user.bankAccount ?? '',
				bankHolder: user.bankHolder ?? '',
			},
			customer: {
				name: '',
				email: '',
				address: '',
				phone: '',
			},
			invoiceId: new Date().valueOf().toString(),
			createdDate: new Date().toLocaleDateString(),
			dueDate: new Date().toLocaleDateString(),
			note: '',
			status: 'Not Paid',
			items: [] as IItem[],
			totalAmount: 0,
		},
		onSubmit: async (values) => {
			// const result = await createInvoice(values);
			console.log(values);
		},
	});

	// add context api to pass the state to children
	// setContext("issuer", () => {
	//     getIssuer: () => $data.user, get;
	// });

	function setTotalAmount(event) {
		// not need to be edited after changing to felte
		$data.totalAmount = event.detail.totalAmount;
		// invoice.note = note;
		invoice.totalAmount = Number($data.totalAmount.toFixed(2));
	}

	const printInvoice = () => {
		window.print();
	};
</script>

<div class="sm:grid lg:grid grid-cols-2 ">
	<section
		class="not-printable md:grid grdi-cols-3 p-5 m-5 border-2 rounded shadow-md w-50"
	>
		<form use:form>
			<h1 class="text-center text-4xl font-extrabold mb-2">
				Create your next invoice
			</h1>

			<div class="invoice-create-form lg:grid grid-col-3">
				<section class="issuer-section border-b-2 border-b-gray-600 pb-5">
					<h3 class="font-extrabold">Issue Company Info.</h3>

					<IssuerInfo bind:issuer="{$data.issuer}" />
				</section>
				<section class="issuer-section border-b-2 border-b-gray-600  pb-5">
					<h3 class="font-extrabold">Customer Company & Invoice Info.</h3>
					<div class="lg:grid grid-cols-2 gap-2  ">
						<CustomerInfo bind:customer="{$data.customer}" />
						<Dates
							bind:invoiceId="{$data.invoiceId}"
							bind:invoiceDate="{$data.createdDate}"
							bind:invoiceDueDate="{$data.dueDate}"
							bind:status="{$data.status}"
						/>
					</div>
				</section>
				<ItemInputs
					bind:items="{$data.items}"
					on:setTotalAmount="{setTotalAmount}"
				/>

				<Note bind:note="{$data.note}" />
			</div>
			<Button type="submit" text="{'Save'}" class="secondary" />
		</form>
	</section>
	<section
		class="invoice-preview rounded border-2 shadow-md p-5 m-5 
  flex flex-col
  gap-5
  "
	>
		<div class="not-printable self-center">
			<Button func="{printInvoice}" text="{'Print'}" class="success" />
		</div>
		<section class="flex justify-between">
			<Issuer bind:issuer="{$data.issuer}" />

			<h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
		</section>

		<CustomerInfoPreview
			bind:invoiceId="{$data.invoiceId}"
			bind:createdDate="{$data.createdDate}"
			bind:dueDate="{$data.dueDate}"
			bind:client="{$data.customer}"
			bind:status="{$data.status}"
		/>

		<ItemTable bind:items="{$data.items}" />

		<div class="mt-auto">
			<TotalAmount bind:totalAmount="{$data.totalAmount}" />

			<NotePreview bind:note="{$data.note}" />
		</div>
	</section>
</div>
