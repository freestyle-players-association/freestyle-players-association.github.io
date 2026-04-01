<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.section.title} — FPA Docs</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">{data.section.title}</h1>
	<div class="grid gap-3">
		{#each data.section.pages as page}
			<a href={page.href} class="block">
				<Card.Root class="hover:bg-accent transition-colors cursor-pointer">
					<Card.Header class="pb-3">
						<Card.Title class="text-base">{page.title}</Card.Title>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
