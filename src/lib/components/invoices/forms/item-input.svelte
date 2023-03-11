<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../../common/buttons/button.svelte';
  import ItemTable from './item-table.svelte';

  const dispatch = createEventDispatcher();

  export let item = {
    id: self.crypto.randomUUID(),
    name: '',
    price: 0,
    quantity: 0,
    subtotal: 0,
  };

  $: subtotal = 0;
  export let items = [];
  export let totalAmount = 0;

  function setTotalAmount() {
    totalAmount = items.reduce((prev, current) => prev + current.subtotal, 0);

    dispatch('setTotalAmount', {
      totalAmount: totalAmount,
    });
  }

  function appendItem() {
    if (item.name === '' || item.price === 0 || item.quantity === 0) return;

    subtotal = item.price * item.quantity;
    items = [
      ...items,
      {
        ...item,
        subtotal: subtotal,
      },
    ];

    setTotalAmount();

    item = {
      id: self.crypto.randomUUID(),
      name: '',
      price: 0,
      quantity: 0,
      subtotal: 0,
    };
  }

  function editRow(id: string) {
    let editingRow = items.find((item) => item.id === id);

    item = {
      ...item,
      name: editingRow.name,
      price: editingRow.price,
      quantity: editingRow.quantity,
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
  on:submit|preventDefault={appendItem}
>
  <div class="flex flex-col">
    <label for="name">Item</label>
    <input
      class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
      type="text"
      bind:value={item.name}
      required
    />
  </div>

  <div class="flex flex-col">
    <label for="quantity">Quantity</label>
    <input
      class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
      type="number"
      bind:value={item.quantity}
      required
    />
  </div>

  <div class="flex flex-col">
    <label for="price">Price</label>
    <input
      class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10 "
      type="number"
      min={0}
      step={0.001}
      bind:value={item.price}
      required
    />
  </div>
  <Button class="secondary btn-sm place-self-end" text={'Add Item'} />
</form>
<ItemTable {items} {editRow} {deleteRow} inPreview={true} />
