<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let dispatchName;
    export let dispatchFunc;
    let buttonCategory = "";

    switch (dispatchName) {
        case "deleteRow":
            buttonCategory = "error";
            break
        case "editRow":
            buttonCategory = "info";
            break
            default:
            buttonCategory = "";
    }

    const dispatch = createEventDispatcher();

    const deleteRow = () => dispatch(dispatchName);
</script>

<button class={`btn btn-outling btn-${buttonCategory}`} on:click={dispatchFunc}>Delete</button>
