<script>
  export let text = '';
  export let func = function () {};
</script>

<button
  class={`btn btn-outline btn-${$$props.class} rounded-xl m-2 `}
 
  on:click={func}
>
  {text}
</button>
