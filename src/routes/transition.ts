import { cubicOut } from "svelte/easing";
import { crossfade } from "svelte/transition";

export const [send, recieve] = crossfade({
  duration: 400,
  easing: cubicOut,
});
