<script lang="ts">
  import type { ICustomer } from '../../interfaces/customer.interface';

  export let customer: ICustomer = {
    name: '',
    address: '',
    email: '',
    phone: '',
  };
</script>

<!-- 
	add debounce search for customer info by id
	populate input

-->
<div class="flex flex-col mt-3">
  <label for="customerName">Name</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="text"
    name="customer.name"
    id="name"
    bind:value={customer.name}
    required
  />
  <label for="customerAddress">Address</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="text"
    name="customer.address"
    id="address"
    bind:value={customer.address}
    required
  />
  <label for="customerAddress">Email</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="email"
    name="customer.email"
    id="email"
    bind:value={customer.email}
    required
  />
  <label for="customerAddress">Phone</label>
  <input
    class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
    type="tel"
    name="customer.phone"
    id="phone"
    bind:value={customer.phone}
    required
  />
</div>
