<script lang="ts">
  import Game from "./Game.svelte";
  import "../style.css";
  import Modal from "./Modal.svelte";
  import { levels } from "./levels";
  import { confetti } from "@neoconfetti/svelte";

  let state: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
  let game: Game;
</script>

<Game
  bind:this={game}
  on:play={() => {
    state = "playing";
  }}
  on:lose={() => {
    state = "lost";
  }}
  on:win={() => {
    state = "won";
  }}
  on:pause={() => {
    state = "paused";
  }}
/>
{#if state === "won"}
  <div
    class="confetti"
    use:confetti={{ stageWidth: innerWidth, stageHeight: innerHeight }}
  />{/if}
{#if state !== "playing"}
  <Modal>
    <header>
      <h1>e<span>match</span>i</h1>
      <p>the emoji matching game</p>
    </header>
    {#if state === "won" || state === "lost"}
      <p>you {state} the game</p>
    {:else if state === "paused"}
      <p>game paused</p>
    {:else if state === "waiting"}
      <p>choose a level</p>
    {/if}
    <div class="buttons">
      {#if state === "paused"}
        <button
          on:click={() => {
            game.resume();
            state = "playing";
          }}>resume</button
        >
        <button
          on:click={() => {
            game.quit();
            state = "lost";
          }}>quit</button
        >
      {:else}
        {#each levels as level}
          <button
            on:click={() => {
              game.start(level);
            }}>{level.label}</button
          >
        {/each}
      {/if}
    </div>
  </Modal>
{/if}

<style>
  h1 {
    font-size: 8em;
    margin: 0;
  }
  h1 span {
    color: #a424ff;
  }
  header {
    text-align: center;
  }
  header p {
    font-size: 2em;
    margin: 0;
  }
  p {
    font-family: Grandstander;
    margin: 2rem;
    text-align: center;
  }
  .confetti {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 2em;
  }

  button {
    font-family: Grandstander;
    font-size: 1em;
    padding: 1em 1em;
    border: none;
    border-radius: 0.5em;
    background-color: #a424ff;
    color: white;
    cursor: pointer;
  }
</style>
