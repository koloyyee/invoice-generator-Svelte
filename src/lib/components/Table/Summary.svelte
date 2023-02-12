<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type TableOptions,
	} from '@tanstack/svelte-table';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { IInvoice } from '../../interfaces/index';
	import { fetchInvoices, invoices } from '../../stores/invoice/index';

	// Add session to autofill the user's name, email, address.

	onMount(() => fetchInvoices());

	const defaultColumns: ColumnDef<IInvoice>[] = [
		{
			accessorFn: (row) => row.status,
			id: 'status',
			cell: (info) => info.getValue(),
			header: () => 'Payment Status',
		},

		{
			accessorKey: 'invoiceId',
			id: 'invoiceId',
			cell: (info) => info.getValue(),
			header: () => 'Id (click for invoice detail)',
		},
		{
			accessorKey: 'customer.name',
			cell: (info) => info.getValue(),
			header: () => 'Customer Name',
		},
		{
			accessorKey: 'customer.address',
			cell: (info) => info.getValue(),
			header: () => 'Customer Address',
		},
		{
			accessorKey: 'dueDate',
			cell: (info) => info.getValue(),
			header: () => 'Due Date',
		},
		{
			accessorFn: (row) => row.totalAmount,
			id: 'totalAmount',
			cell: (info) => info.getValue(),
			header: () => 'Total Amount($)',
		},
	];

	let sorting = [];

	const setSorting = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting,
			},
		}));
	};

	const options = writable<TableOptions<IInvoice>>({
		data: $invoices,
		columns: defaultColumns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});

	const table = createSvelteTable(options);
	const paid = $invoices.filter((value) => value.status === 'Paid').length;
	const notPaid = $invoices.filter(
		(value) => value.status === 'Not paid'
	).length;
	const voided = $invoices.filter((value) => value.status === 'Void').length;
</script>

<div class="shadow-md border-1 overflow-auto w-full lg:w-full ">
	<table
		class="table-auto items-center bg-transparent w-1/2 md:w-full  lg:w-full "
	>
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th
							colSpan="{header.colSpan}"
							scope="col"
							class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
						>
							{#if !header.isPlaceholder}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div
									class:cursor-pointer="{header.column.getCanSort()}"
									class:select-none="{header.column.getCanSort()}"
									on:click="{header.column.getToggleSortingHandler()}"
								>
									<svelte:component
										this="{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}"
									/>
									<!-- {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted().toString()] ?? ''} -->
								</div>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row, index}
				<tr class="{index % 2 === 0 ? 'bg-slate-200 dark:bg-slate-800 ' : ''}">
					{#each row.getVisibleCells() as cell}
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
						>
							<a
								href="{cell.column.columnDef.id === 'invoiceId'
									? `#/invoice/${cell.getValue()}`
									: '#/invoice'}"
							>
								<svelte:component
									this="{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}"
								/>
							</a>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
