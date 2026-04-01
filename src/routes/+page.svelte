<script lang="ts">
	import type { PageData } from './$types';
	import * as Button from '$lib/components/ui/button/index.js';
	import { BookOpen } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	const firstPage = $derived(data.nav[0]?.pages[0]);
</script>

<svelte:head>
	<title>FPA Docs</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
	<h1 class="text-4xl font-bold">FPA Documentation</h1>
	<p class="text-muted-foreground text-lg max-w-md">
		Official documentation for the Freestyle Players Association — competition rules, judging
		manuals, and rankings explained.
	</p>
	{#if firstPage}
		<Button.Root href={firstPage.href} size="lg" class="gap-2">
			<BookOpen class="size-5" />Get Started
		</Button.Root>
	{/if}
</div>
