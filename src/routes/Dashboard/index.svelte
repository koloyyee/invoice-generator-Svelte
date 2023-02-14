<script lang="ts">
	import { onMount } from 'svelte';
	import Bar from '../../lib/components/Charts/Bar.svelte';
	import Pie from '../../lib/components/Charts/Pie.svelte';
	import type { IInvoice } from '../../lib/interfaces';
	import { fetchInvoices, invoices } from '../../lib/stores/invoice';
	import { fetchStatus, statusStore } from '../../lib/stores/status';
	import {
		nameTotalReducer,
		statusAggregationReducer,
	} from '../../lib/util/helpers';

	onMount(async () => {
		Promise.all([fetchInvoices(), fetchStatus()]);
	});

	let localInvoices: IInvoice[];
	$: localInvoices = JSON.parse(localStorage.getItem('invoices'));
	localInvoices = localInvoices ?? $invoices;

	let localStatus;
	$: localStatus = JSON.parse(localStorage.getItem('status'));
	localStatus = localStatus ?? $statusStore;

	const { labels, counts } = statusAggregationReducer($statusStore);
	const { names, totalAmounts } = nameTotalReducer(localInvoices);

	async function getForm(event) {
		const formData = new FormData(event.target);
		const params = new URLSearchParams();

		for (let [key, value] of formData) {
			params.append(key, value);
		}
		const res = fetch(`${import.meta.env.VITE_BACKEND_API}/status/${params}`);
		console.log(await res);
	}
</script>

<!-- <form action="" on:submit|preventDefault="{getForm}" method="get">
	<label for="name">
		Name
		<input type="text" name="name" />
	</label>
	<label for="password">
		<input type="text" name="password" />
	</label>
	<button type="submit"> submit </button>
</form> -->

<section
	class="w-full font-extrabold text-3xl  md:h-screen flex flex-col  p-8 "
>
	<h1 class="text-4xl text-extrabold mb-4">Dashboard</h1>
	<article class="grid md:grid-cols-2 gap-2 w-1/3 md:w-full items-center">
		<Pie labels="{labels}" counts="{counts}" />
		<Bar labels="{names}" totalAmount="{totalAmounts}" />
	</article>
</section>
