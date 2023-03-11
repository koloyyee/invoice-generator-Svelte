<script lang="ts">
  import { Toaster } from 'svelte-french-toast';
  import Router from 'svelte-spa-router';
  import Drawer from './lib/components/common/nav/drawer.svelte';
  import { localStorageUsername } from './lib/stores/auth';
  import routes from './routes';
  import Auth from './routes/auth/index.svelte';
</script>

<body class="flex">
  {#if $localStorageUsername !== null}
    <Drawer>
      <!--   <Menu /> -->

      <main class="">
        <Toaster />
        <Router {routes} />
      </main>
    </Drawer>
  {:else}
    <Auth />
  {/if}
</body>

<style>
  * {
    height: 100%;
  }
  main {
    padding: 0;
    margin: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
      height: 100%;
    }
  }
</style>
