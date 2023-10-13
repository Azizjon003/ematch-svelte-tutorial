<script lang="ts">
  import { get_twemoji_url } from "./utiils";

  export let found: string[];
</script>

<div class="found">
  {#each found as emoji}
    <img alt={emoji} src={get_twemoji_url(emoji)} />
  {/each}
</div>

<style>
  .found {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }
  img {
    width: 6em;
    height: 6em;
  }
</style>
