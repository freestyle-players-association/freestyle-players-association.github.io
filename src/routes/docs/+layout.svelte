<script lang="ts">
	import * as Button from '$lib/components/ui/button/index.js';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
	<title>{data.currentTitle ? `${data.currentTitle} — FPA Docs` : 'FPA Docs'}</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8 flex gap-8">
	<article class="prose prose-neutral dark:prose-invert min-w-0 flex-1">
		{@render children()}
	</article>

	<aside class="hidden xl:block w-56 shrink-0">
		<TableOfContents />
	</aside>
</div>

<nav
	class="max-w-5xl mx-auto px-4 pb-8 flex items-center justify-between gap-4 border-t pt-6"
>
	{#if data.prevPage}
		<Button.Root variant="outline" href={data.prevPage.href} class="flex items-center gap-2">
			<ChevronLeft class="size-4" />
			{data.prevPage.title}
		</Button.Root>
	{:else}
		<div></div>
	{/if}

	{#if data.nextPage}
		<Button.Root variant="outline" href={data.nextPage.href} class="flex items-center gap-2">
			{data.nextPage.title}
			<ChevronRight class="size-4" />
		</Button.Root>
	{/if}
</nav>
