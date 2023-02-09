<script lang="ts">
	import { onMount } from 'svelte';
	import Bar from '../../lib/components/Charts/Bar.svelte';
	import Pie from '../../lib/components/Charts/Pie.svelte';
	import type { IInvoice } from '../../lib/interfaces';
	import { fetchInvoices, invoices } from '../../lib/stores/invoice';
	import { fetchStatus, statusStore } from '../../lib/stores/status';
	import {
		nameTotalReducer,
		statusAggregationReducer
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
</script>

<section
	class="w-full font-extrabold text-3xl  md:h-screen flex flex-col  p-8 "
>
	<article class="grid md:grid-cols-2 gap-2 w-1/3 md:w-full items-center">
		<Pie labels="{labels}" counts="{counts}" />
		<Bar labels="{names}" totalAmount="{totalAmounts}" />
	</article>
</section>
