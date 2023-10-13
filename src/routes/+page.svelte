<script lang="ts">
  import Game from "./Game.svelte";
  import "../style.css";
  import Modal from "./Modal.svelte";
  import { levels } from "./levels";

  let store: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
</script>

<Game />

{#if store !== "playing"}
  <Modal>
    <header>
      <h1>e<span>match</span>i</h1>
      <p>the emoji matching game</p>
    </header>
    {#if store === "won" || store === "lost"}
      <p>you {store} the game</p>
    {:else if store === "paused"}
      <p>game paused</p>
    {:else if store === "waiting"}
      <p>choose a level</p>
    {/if}
    <div class="buttons">
      {#if store === "paused"}
        <button>resume</button>
        <button>quit</button>
      {:else}
        {#each levels as level}
          <button>{level.label}</button>
        {/each}
      {/if}
    </div>
  </Modal>
{/if}

<style>
  h1 {
    font-size: 4em;
  }
  h1 span {
    color: purple;
  }
  p {
    font-family: Grandstander;
  }
</style>
