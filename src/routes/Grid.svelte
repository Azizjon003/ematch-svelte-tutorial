<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Squere from "./Squere.svelte";

  const dispatch = createEventDispatcher();
  export let grid: string[];
  export let found: string[];
  export let a: number = -1;

  let b: number = -1;
  let reset_timeout: number;
</script>

<div class="grid">
  {#each grid as emoji, i}
    <Squere
      {emoji}
      on:click={() => {
        clearTimeout(reset_timeout);
        if (a === -1 && b === -1) {
          a = i;
        } else if (b === -1) {
          b = i;
          if (grid[a] === grid[b]) {
            // a = -1;
            // b = -1;
            dispatch("found", {
              emoji,
            });
            reset_timeout = setTimeout(() => {
              a = -1;
              b = -1;
            }, 1000);
          } else {
            reset_timeout = setTimeout(() => {
              a = -1;
              b = -1;
            }, 1000);
          }
        } else {
          b = -1;
          a = i;
        }
      }}
      selected={a === i || b === i}
      found={found.includes(emoji)}
      group={grid.indexOf(emoji) === i ? "a" : "b"}
    />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--size), 1fr);
    grid-template-rows: repeat(var(--size), 1fr);
    grid-gap: 0.5em;
    height: 100%;
    perspective: 100vw;
  }
</style>
