<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function accessDemoAC() {
    dispatch('accessDemoAC', {
      username: 'testAccount2',
      password: 'password',
    });
  }
</script>

<button class="link link-primary" on:click={accessDemoAC}>
  demo account
</button>
