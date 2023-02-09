<script lang="ts">
    import Router from "svelte-spa-router";
    import Drawer from "./lib/components/Nav/Drawer.svelte";
    import { localStorageUsername } from "./lib/stores/auth";
    import routes from "./routes";
    import Auth from "./routes/Auth/index.svelte";

</script>

<body class="flex">
    {#if $localStorageUsername !== null}
        <Drawer>
            <!--   <Menu /> -->

            <main class="">
                <Router { routes } />
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
