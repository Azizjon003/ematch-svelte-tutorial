<script lang="ts">
  import Squere from "./Squere.svelte";
  export let grid: string[];

  let a: number = -1;
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
            a = -1;
            b = -1;
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
    />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 0.5em;
    height: 100%;
  }
</style>
