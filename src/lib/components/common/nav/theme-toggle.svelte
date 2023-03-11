<script>
  const theme = {
    light: 'corporate',
    dark: 'business',
  };

  let isLight = false;

  function toggleTheme() {
    const dataTheme = document.querySelector('[data-theme]');
    isLight = !isLight;
    return dataTheme.setAttribute(
      'data-theme',
      isLight ? theme.dark : theme.light
    );
  }
</script>

<label class="flex px-0 items-center justify-center gap-2 not-printable">
  <input
    type="checkbox"
    class="appearance-none peer"
    checked={isLight}
    on:click={toggleTheme}
  />
  🌞
  <span
    class="w-12 h-8 flex items-center flex-shrink-0  p-1 rounded-full 
        bg-yellow-400 border-spacing-2 border-gray-400 border-2
        

        after:w-6
        after:h-6
        after:bg-white
        after:rounded-full
        after:shadow-md

        peer-check:bg-green-400
        duration-300 ease-in-out
        after:duration-300
        peer-checked:after:translate-x-4
        peer-checked:bg-black
        "
  />
  🌙
</label>
