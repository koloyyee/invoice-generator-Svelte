<script>
  import { createForm } from 'felte';
  import { z } from 'zod';
  import { register } from '../../apis/users';
  import AuthBtn from './auth-btn.svelte';
  import HasAccount from './has-account-btn.svelte';

  const schema = z.object({
    username: z.string(),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Must be 8 or more characters long.' }),
    confirmPassword: z.string().min(8),
  });

  const warningSchema = z
    .object({
      password: z
        .string()
        .refine((value) => (value ? value.length > 8 : true), {
          message: 'Password not secure',
        }),

      confirmPassword: z
        .string()
        .refine((value) => (value ? value.length > 8 : true), {
          message: 'Password not secure',
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match.',
        });
      }
    });

  const { form, errors, data } = createForm({
    initialValues: {
      user: {
        _id: self.crypto.randomUUID(),
        username: '',
        // @ts-ignore
        password: '',
        confirmPassword: '',
        email: '',
      },
    },

    onSubmit: async (values, { resetField }) => {
      if (values.user.password !== values.user.confirmPassword) return;

      await register(values.user);
    },
    // warn: (values) => {
    // 	const warnings = {};
    // 	if (values.password !== values.confirmPassword) {
    // 		warnings.password = "The password needs to be the same.";
    // 	}
    // 	return warnings;
    // },

    // extend: [
    // 	validator({ schema: schema }),
    // 	validator({ schema: warningSchema, level: "warning" }),
    // ],
  });
</script>

<form use:form>
  <div
    class="card w-96 bg-base-100 shadow-xl rounded-lg border-gray-100 border-2"
  >
    <div class="card-body">
      <h2 class="card-title">REGISTER</h2>

      <label for="username">
        Username:
        <input
          class="error rounded input input-bordered w-full max-w-xs"
          type="text"
          name="user.username"
          id="username"
          bind:value={$data.user.username}
          required
        />
      </label>
      <label for="password">
        Password:
        <input
          class="error rounded input input-bordered w-full max-w-x"
          type="password"
          name="user.password"
          id="password"
          bind:value={$data.user.password}
          minlength="8"
          required
        />
      </label>
      <label for="comfirmPassword">
        Confirm Password:
        <input
          class={`error rounded input input-bordered w-full max-w-x`}
          type="password"
          name="user.confirmPassword"
          id="confirmPassword"
          bind:value={$data.user.confirmPassword}
          minlength="8"
          required
        />
      </label>
      <label for="email">
        Email:
        <input
          class="error rounded input input-bordered w-full max-w-x"
          type="email"
          name="user.email"
          bind:value={$data.user.email}
          id="email"
          required
        />
      </label>

      <AuthBtn action={'Register'} />
    </div>
  </div>
</form>
<HasAccount />
