<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Countdown from "./Countdown.svelte";
  import Found from "./Found.svelte";
  import { confetti } from "@neoconfetti/svelte";
  import Grid from "./Grid.svelte";
  import { levels } from "./levels";
  import type { Level } from "./levels";
  import { shuffle } from "./utiils";

  const dispatch = createEventDispatcher();
  let size: number;
  let grid: string[] = [];
  let found: string[] = [];
  let remaining: number = 0;
  let duration: number = 0;
  let playing: boolean = false;

  export function start(level: Level) {
    size = level.size;
    grid = create_grid(level);
    remaining = duration = level.duration;

    resume();
  }

  function resume() {
    playing = true;
    countdown();
    dispatch("play");
  }
  function create_grid(level: Level) {
    const copy = level.emojis.slice();
    console.log(copy);
    const pairs: string[] = [];

    for (let i = 0; i < size ** 2 / 2; i++) {
      const index = Math.floor(Math.random() * copy.length);
      const emoji = copy[index];
      copy.splice(index, 1);
      pairs.push(emoji);
    }

    pairs.push(...pairs);
    return shuffle(pairs);
  }

  function countdown() {
    const start = Date.now();
    const remaining_start_at = remaining;

    function loop() {
      if (!playing) return;
      requestAnimationFrame(loop);

      remaining = remaining_start_at - (Date.now() - start);

      if (remaining <= 0) {
        dispatch("lose");
        playing = false;
      }
    }
    loop();
  }

  onMount(countdown);
</script>

<div class="game" style="--size:{size}">
  <div class="info">
    {#if playing}
      <Countdown
        {duration}
        {remaining}
        on:click={() => {
          playing = false;
          dispatch("pause");
        }}
      />
    {/if}
  </div>
  <div class="grid-container">
    <Grid
      {grid}
      on:found={(e) => {
        found = [...found, e.detail.emoji];
        if (found.length === size ** 2 / 2) {
          dispatch("win");
        }
      }}
      {found}
    />
  </div>

  <div class="info">
    <Found {found} />
  </div>
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: min(10vmin, 0.3em);
  }
  .info {
    width: 80vmin;
    height: 10vmin;
    /* background-color: purple; */
  }
  .grid-container {
    width: 80vmin;
    height: 80vmin;
    /* background-color: teal; */
  }
</style>
