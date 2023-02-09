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
	import { currentUser } from '../../lib/stores/auth';
	import { additionalNote } from '../../lib/stores/invoice/additionalNote';
	import { invoice } from '../../lib/util/emptyState';

	// TODO! Refactor to felte!
	// Issuer's info value
	let {
		invoiceId,
		invoiceDate,
		invoiceDueDate,
		issuer,
		client,
		items,
		note,
		totalAmount,
		status,
	} = invoice;

	additionalNote.subscribe((value) => {
		invoice.note = value;
	});
	
	const user = $currentUser?? JSON.parse(localStorage.getItem('appUser'))
	
	const { form, errors, data } = createForm({
		initialValues: {
			issuer: {
				username: user.username?? '', 
				email: user.email?? '' ,
				phone: user.phone?? '',
				website: user.website?? '',
				address: user.address?? '',
				bankName: user.bankName?? '',
				bankAccount: user.bankAccount?? '',
				holderName: user.holderName?? '', 
			},
			customer: {
				name: '',
				email: '',
				address: '',
				phone: '',
			},
			invoice: {
				invoiceId: new Date().valueOf().toString(),
				invoiceDate: new Date().toLocaleDateString(),
				invoiceDueDate: new Date().toLocaleDateString(),
			},
			note: '',
			status: 'Not Paid',
			items: [],
			totalAmount: '',
		},
		onSubmit: async (values) => {},
	});

	// add context api to pass the state to children
	// setContext("issuer", () => {
	//     getIssuer: () => $data.user, get;
	// });

	function setTotalAmount(event) {
		// not need to be edited after changing to felte
		totalAmount = event.detail.totalAmount;
		invoice.items = items;
		// invoice.note = note;
		invoice.totalAmount = Number(totalAmount.toFixed(2));
	}

	const printInvoice = () => {
		window.print();
	};

	const saveInvoice = async () => {
		if (
			issuer.username === '' ||
			issuer.email === '' ||
			issuer.bankName === '' ||
			issuer.bankHolder === '' ||
			issuer.bankAccount === '' ||
			issuer.address === '' ||
			client.name === '' ||
			client.clientAddress === '' ||
			items.length === 0 ||
			totalAmount === 0
		)
			return;

		additionalNote.set(note);

		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(invoice),
			});
			return res.status;
		} catch (error) {
			console.error(error.message);
			return error.message;
		}

		invoiceId = new Date().valueOf().toString();
		invoiceDate = new Date().toLocaleDateString();
		invoiceDueDate = new Date().toLocaleDateString();
		issuer.username = '';
		issuer.address = '';
		issuer.email = '';
		issuer.website = '';
		issuer.bankName = '';
		issuer.bankAccount = '';
		issuer.bankHolder = '';
		client.name = '';
		client.clientAddress = '';
		items = [];
		note = '';
		totalAmount = 0;
	};
</script>
<div class="sm:grid lg:grid grid-cols-2 ">
	<section
		class="not-printable md:grid grdi-cols-3 p-5 m-5 border-2 rounded shadow-md w-50"
	>
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
					<CustomerInfo bind:client="{client}" />
					<Dates
						bind:invoiceId="{invoiceId}"
						bind:invoiceDate="{invoiceDate}"
						bind:invoiceDueDate="{invoiceDueDate}"
						bind:status="{status}"
					/>
				</div>
			</section>
			<ItemInputs bind:items="{items}" on:setTotalAmount="{setTotalAmount}" />

			<Note bind:note="{note}" />
		</div>
	</section>
	<section
		class="invoice-preview rounded border-2 shadow-md p-5 m-5 
  flex flex-col
  gap-5
  "
	>
		<div class="not-printable self-center">
			<Button func="{printInvoice}" text="{'Print'}" class="success" />
			<Button func="{saveInvoice}" text="{'Save'}" class="secondary" />
		</div>
		<section class="flex justify-between">
			<Issuer bind:issuer="{issuer}" />

			<h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
		</section>

		<CustomerInfoPreview
			bind:invoiceId="{invoiceId}"
			bind:invoiceDate="{invoiceDate}"
			bind:invoiceDueDate="{invoiceDueDate}"
			bind:client="{client}"
			bind:status="{status}"
		/>

		<ItemTable bind:items="{items}" />

		<div class="mt-auto">
			<TotalAmount bind:totalAmount="{totalAmount}" />

			<NotePreview bind:note="{note}" />
		</div>
	</section>
</div>
