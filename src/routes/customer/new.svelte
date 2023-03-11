<script>
  import { createForm } from 'felte';
  import toast from 'svelte-french-toast';
  import { createCustomer, queryExistingUsers } from '../../lib/apis/customers';
  import Button from '../../lib/components/common/buttons/button.svelte';

  let existingCustomers = [
    { name: null, email: null, address: null, phone: null },
  ];
  let customers;

  const { form, errors, touched, isSubmitting } = createForm({
    initialValues: {
      customer: {
        name: '',
        address: '',
        email: '',
        phone: '',
      },
    },
    onSubmit: async (values) => {
      const result = await createCustomer(values.customer);

      return result;
    },
    onSuccess(response, context) {
      if (response === 201) {
        toast.success('Customer created!');
      }
    },
    onError(error, context) {
      console.error(`onError: ${error}`);
      toast.error('User existed already.');
    },
  });

  function queryUser(event) {
    const queryObject = {};
    const name = event.target.name.split('.')[1];
    const value = event.target.value.trim();

    if (value === '') {
      return (existingCustomers = [
        { name: null, email: null, address: null, phone: null },
      ]);
    }
    queryObject[name] = value;

    setTimeout(async () => {
      const result = await queryExistingUsers(queryObject);
      customers = result;
      console.log(customers);
    }, 800);
  }
</script>

<h1 class="text-4xl font-extrabold py-5 mx-5">Create New Customer Profile</h1>
<section class="grid place-content-center">
  <form
    use:form
    class="flex flex-col border-2 border-gray-50 shadow-xl
justify-center items-center
w-max  p-10 rounded sm:mx-5"
  >
    <label for="name" class="w-full">
      Username:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="customer.name"
        id="name"
        on:keyup={queryUser}
        required
      />
    </label>
    <label for="address" class="w-full">
      Address:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="customer.address"
        id="address"
        required
      />
    </label>
    <label for="email" class="w-full">
      Email:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="email"
        name="customer.email"
        id="email"
        on:keyup={queryUser}
        required
      />
    </label>
    <label for="phone" class="w-full">
      Phone
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="tel"
        name="customer.phone"
        id="phone"
        required
      />
    </label>

    <Button class="primary my-5" text={'Create'} />
  </form>
</section>
