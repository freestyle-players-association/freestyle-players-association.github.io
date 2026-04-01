<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
</script>

<header
	class="md:hidden bg-background/95 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 flex justify-between h-12 items-center gap-2 border-b px-4 backdrop-blur"
>
	<Sidebar.Trigger />
	<ModeToggle />
</header>
