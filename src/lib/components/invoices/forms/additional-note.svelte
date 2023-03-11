<script>
  import { additionalNote } from '../../../stores/invoice';

  export let note = '';
  additionalNote.update((value) => (value = note));
</script>

<div class="flex flex-col">
  <label for="note">Additional Note</label>
  <textarea
    class="rounded
focus:border-dotted focus:border-2 focus:border-purple-300"
    name="note"
    id="note"
    rows="10"
    bind:value={note}
  />
</div>
