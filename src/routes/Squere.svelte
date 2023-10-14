<script lang="ts">
  import { get_twemoji_url } from "./utiils";
  import { send } from "./transition";
  export let emoji: string;
  export let selected: boolean;
  export let found: boolean;
  export let group: "a" | "b";
</script>

<div class="square" class:flipped={selected || found}>
  <button on:click />
  <div class="background" />
  {#if !found}
    <img
      out:send={{
        key: `${emoji}:${group}`,
      }}
      alt={emoji}
      src={get_twemoji_url(emoji)}
    />
  {/if}
</div>

<style>
  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }
  .flipped {
    transform: rotateY(180deg);
  }
  button {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 0;
    border-radius: 15%;
    font-size: inherit;
    background-color: var(--bg-3);
  }

  .background {
    position: absolute;
    background: var(--bg-1);
    border: 0.5em solid var(--purple);
    transform: rotateY(180deg);
    backface-visibility: hidden;
    border-radius: 10%;
    width: 100%;
    height: 100%;
  }

  img {
    width: 8em;
    height: 8em;
    pointer-events: none;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    background: --bg-3;
  }
</style>
