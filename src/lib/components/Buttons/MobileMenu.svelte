
<script>
    import MdMenu from 'svelte-icons/md/MdMenu.svelte';
    export let toggleMenu;

</script>

<button on:click={toggleMenu} class='not-printable menu-toggle text-white bg-slate-900 w-12 p-2 rounded-full 
fixed 
bottom-8 right-8 z-30
border-2 border-white
opacity-75 lg:hidden'>
    <MdMenu />
</button>
