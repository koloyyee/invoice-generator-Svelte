<script lang="ts">
  import { createForm } from 'felte';
  import { replace } from 'svelte-spa-router';
  import { getUserByUsername, getUserProfile, login } from '../../apis/users';
  import {
    currentUser,
    isAuthenticated,
    localStorageUsername,
    logout,
  } from '../../stores/auth';
  import AuthBtn from './auth-btn.svelte';
  import DemoAccountAccess from './demo-account-access.svelte';
  import HasAccount from './has-account-btn.svelte';

  (function () {
    logout();
  })();

  const { form, errors, data } = createForm({
    initialValues: {
      user: {
        // @ts-ignore
        username: '',
        password: '',
      },
    },
    onSubmit: async (values) => {
      const [error, token] = await login(values);
      if (error) throw error;

      const [error2, { id, username }] = await getUserProfile(token);
      if (error2) throw error2;

      return username;
    },
    onSuccess: async (username: string, context) => {
      const [, user] = await getUserByUsername(username);

      isAuthenticated.set(true);
      localStorageUsername.set(username);

      localStorage.setItem('appUser', JSON.stringify(user));
      currentUser.update((value) => (value = user));
      replace('/');
    },
    onError(error, context) {
      console.error(error);
    },
  });

  function fillDemo(event: CustomEvent) {
    $data.user.username = event.detail.username;
    $data.user.password = event.detail.password;
  }
</script>

<form use:form>
  <div
    class="card w-96 bg-base-100 shadow-xl rounded-lg border-gray-100 border-2"
  >
    <div class="card-body">
      <h2 class="card-title">LOGIN</h2>
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
          class="error rounded input input-bordered w-full max-w-xs"
          type="password"
          name="user.password"
          id="password"
          bind:value={$data.user.password}
          required
        />
      </label>
      <DemoAccountAccess on:accessDemoAC={fillDemo} />

      <AuthBtn action={'Login'} />
    </div>
  </div>
</form>
<HasAccount />
