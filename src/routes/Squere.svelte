<script lang="ts">
  import { get_twemoji_url } from "./utiils";

  export let emoji: string;
  export let selected: boolean;
  export let found: boolean;
</script>

<div class="square" class:flipped={selected}>
  <button on:click />
  {#if !found}
    <img alt={emoji} src={get_twemoji_url(emoji)} />
  {/if}
</div>

<style>
  .square {
    background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flipped button {
    background-color: red;
  }
  button {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  img {
    width: 6em;
    height: 6em;
    pointer-events: none;
  }
</style>
