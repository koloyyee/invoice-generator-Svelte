<script>
  import Login from '../../lib/components/auth/login.svelte';
  import Register from '../../lib/components/auth/register.svelte';
  import { hasAccount } from '../../lib/stores/auth';

  console.log($hasAccount);
</script>

<section
  class="card w-full h-screen flex flex-col items-center justify-center "
>
  {#if $hasAccount}
    <Login />
  {:else}
    <Register />
  {/if}
</section>
