<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../../components/Buttons/Button.svelte';
	import ItemTable from './ItemTable.svelte';

	const dispatch = createEventDispatcher();

	export let item = {
		id: self.crypto.randomUUID(),
		itemName: '',
		itemPrice: 0,
		itemQuantity: 0,
		itemSubtotal: 0,
	};

	$: subtotal = 0;
	export let items = [];
	export let totalAmount = 0;

	function setTotalAmount() {
		totalAmount = items.reduce(
			(prev, current) => prev + current.itemSubtotal,
			0
		);

		dispatch('setTotalAmount', {
			totalAmount: totalAmount,
		});
	}

	function appendItem() {
		if (item.itemName === '' || item.itemPrice === 0 || item.itemQuantity === 0)
			return;

		subtotal = item.itemPrice * item.itemQuantity;
		items = [
			...items,
			{
				...item,
				itemSubtotal: subtotal,
			},
		];

		setTotalAmount();

		item = {
			id: self.crypto.randomUUID(),
			itemName: '',
			itemPrice: 0,
			itemQuantity: 0,
			itemSubtotal: 0,
		};
	}

	function editRow(id: string) {
		let editingRow = items.find((item) => item.id === id);

		item = {
			...item,
			itemName: editingRow.itemName,
			itemPrice: editingRow.itemPrice,
			itemQuantity: editingRow.itemQuantity,
		};
		let list = items.filter((item) => item.id !== id);
		items = list;
	}
	const deleteRow = (id: string) => {
		items = items.filter((item) => item.id !== id);
	};
</script>

<form
	class="md:grid grid-cols-4 mb-5 gap-5"
	on:submit|preventDefault="{appendItem}"
>
	<div class="flex flex-col">
		<label for="itemName">Item</label>
		<input
			class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
			type="text"
			name="itemName"
			bind:value="{item.itemName}"
			required
		/>
	</div>

	<div class="flex flex-col">
		<label for="itemQuantity">Quantity</label>
		<input
			class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
			type="number"
			name="itemQuantity"
			bind:value="{item.itemQuantity}"
			required
		/>
	</div>

	<div class="flex flex-col">
		<label for="itemPrice">Price</label>
		<input
			class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10 "
			type="number"
			name="itemPrice"
			min="{0}"
			step="{0.001}"
			bind:value="{item.itemPrice}"
			required
		/>
	</div>
	<Button class="secondary btn-sm place-self-end" text="{'Add Item'}" />
</form>
<ItemTable
	items="{items}"
	editRow="{editRow}"
	deleteRow="{deleteRow}"
	inPreview="{true}"
/>
