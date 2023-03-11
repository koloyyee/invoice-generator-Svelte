<script lang="ts">
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { z } from 'zod';
  import { update } from '../../apis/users';
  import { userSchema } from '../../schema';
  import { currentUser } from '../../stores/auth';
  import Button from '../common/buttons/button.svelte';

  const warnSchema = z.object({
    password: z.string().refine((value) => (value ? value.length > 8 : true), {
      message: 'Password is not secure',
    }),
  });

  const user = $currentUser ?? JSON.parse(localStorage.getItem('appUser'));
  const { form, errors, data, touched } = createForm({
    initialValues: {
      user: {
        username: user?.username ?? '',
        email: user?.email ?? '',
        website: user?.website ?? '',
        address: user?.website ?? '',
        bankName: user?.bankName ?? '',
        bankAccount: user?.bankAccount ?? '',
        bankHolder: user?.bankHolder ?? '',
      },
    },

    extend: [
      validator({ schema: userSchema }),
      validator({ schema: warnSchema, level: 'warning' }),
    ],
    onSubmit: async (values, context) => {
      const [_, result] = await update(user._id, values.user);
      return result;
    },
    onSuccess(response, context) {
      console.log(response);
      console.log(context);
    },
    onError(error, context) {
      console.log(error);
    },
  });
</script>

<h1 class="text-4xl font-extrabold py-5 mx-5">Update your account details</h1>
<section class="grid place-content-center">
  <form
    use:form
    class="flex flex-col border-2 border-gray-50 shadow-xl
justify-center items-center
w-max  p-10 rounded sm:mx-5"
  >
    <label for="username" class="w-full">
      Username:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.username"
        id="username"
        required
      />
      {#if $errors.user.username && $touched.user.username}
        <div class="alert alert-error shadow-lg my-1">
          <div>
            <span class="text-white"> {$errors.user.username}</span>
          </div>
        </div>
      {/if}
    </label>
    <label for="email" class="w-full">
      Email:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="email"
        name="user.email"
        id="email"
        required
      />
    </label>

    <label for="website" class="w-full">
      Website:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.website"
        id="website"
      />
    </label>
    <label for="address" class="w-full">
      Address:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.address"
        id="address"
      />
    </label>
    <label for="holderName" class="w-full">
      Holder's Name:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.bankHolder"
        id="holderName"
      />
    </label>
    <label for="bankName" class="w-full">
      Bank Name:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.bankName"
        id="bankName"
      />
    </label>
    <label for="bankAccount" class="w-full">
      Bank Account:
      <input
        class="error rounded input input-bordered w-full max-w-xs"
        type="text"
        name="user.bankAccount"
        id="bankAccount"
      />
    </label>

    <Button class="secondary my-5" text={'Update'} />
  </form>
</section>
