<script lang="ts">
  import { recieve } from "./transition";
  import { get_twemoji_url } from "./utiils";

  export let found: string[];
</script>

<div class="found">
  {#each found as emoji}
    <div class="pair">
      <img
        alt={emoji}
        in:recieve={{
          key: `${emoji}:a`,
        }}
        src={get_twemoji_url(emoji)}
      />
      <img
        alt={emoji}
        in:recieve={{
          key: `${emoji}:b`,
        }}
        src={get_twemoji_url(emoji)}
      />
    </div>
  {/each}
</div>

<style>
  .found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 0.5em;
    filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
  }
  .pair {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6em;
    width: 6em;
    background: white;
    padding: 1em;
    border-radius: 50%;
  }
  img {
    position: absolute;
    width: 2em;
    height: 2em;
  }
</style>
