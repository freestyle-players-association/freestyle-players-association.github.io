<script lang="ts">
  import { mode, toggleMode } from "mode-watcher";
  import { Sun, Moon } from "@lucide/svelte";
  import * as Button from "$lib/components/ui/button/index.js";
</script>

<Button.Root variant="ghost" onclick={toggleMode} aria-label="Toggle theme">
  <span class="hidden md:block font-sm text-gray-500">Toggle theme</span>
  {#if mode.current === "dark"}
    <Moon class="size-4" />
  {:else}
    <Sun class="size-4" />
  {/if}
</Button.Root>
