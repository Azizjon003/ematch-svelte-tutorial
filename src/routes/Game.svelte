<script lang="ts">
  import { onMount } from "svelte";
  import Countdown from "./Countdown.svelte";
  import Found from "./Found.svelte";
  import Grid from "./Grid.svelte";
  import { levels } from "./levels";
  import type { Level } from "./levels";
  import { shuffle } from "./utiils";
  const level = levels[0];
  let size: number = level.size;
  let grid: string[] = create_grid(level);
  let found: string[] = [];
  let remaining: number = level.duration;
  let duration: number = level.duration;
  let playing: boolean = false;

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
      if (playing) return;
      requestAnimationFrame(loop);

      remaining = remaining_start_at - (Date.now() - start);

      if (remaining <= 0) {
        remaining = 0;
        playing = false;
      }
    }
    loop();
  }

  onMount(countdown);
</script>

<div class="game">
  <div class="info">
    <Countdown {duration} {remaining} />
  </div>
  <div class="grid-container">
    <Grid
      {grid}
      on:found={(e) => {
        found = [...found, e.detail.emoji];
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
