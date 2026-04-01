<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
    import { cn } from '$lib/utils';

	type TocEntry = { id: string; text: string; level: 2 | 3 };

	let entries = $state<TocEntry[]>([]);
	let activeId = $state<string | null>(null);
	let observer: IntersectionObserver | null = null;

	function buildToc() {
		observer?.disconnect();
		activeId = null;

		const article = document.querySelector('article.prose');
		if (!article) {
			entries = [];
			return;
		}

		const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>('h2, h3')).filter(
			(h) => h.id
		);

		entries = headings.map((h) => ({
			id: h.id,
			text: h.textContent?.trim() ?? '',
			level: parseInt(h.tagName[1]) as 2 | 3
		}));

		if (entries.length === 0) return;
		activeId = entries[0].id;

		observer = new IntersectionObserver(
			(intersections) => {
				for (const entry of intersections) {
					if (entry.isIntersecting) activeId = (entry.target as HTMLElement).id;
				}
			},
			{ rootMargin: '-10% 0px -80% 0px' }
		);

		for (const entry of entries) {
			const el = document.getElementById(entry.id);
			if (el) observer.observe(el);
		}
	}

	onMount(() => {
		buildToc();
		return () => observer?.disconnect();
	});

	$effect(() => {
		const _ = page.url.pathname;
		// setTimeout defers DOM reads until after SvelteKit finishes rendering
		// the new page content. buildToc intentionally updates `entries` and
		// `activeId` as a side-effect here, which is the correct pattern for
		// reacting to navigation.
		setTimeout(buildToc, 0);
	});
</script>

{#if entries.length > 1}
	<nav aria-label="Table of contents" class="sticky top-18 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
		<p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
			On this page
		</p>
		<ul class="space-y-1 text-sm">
			{#each entries as entry (entry.id)}
				<li class={cn(entry.level === 3 ? 'pl-3' : '', "my-2")}>
					<a
						href="#{entry.id}"
						class={cn(
                'block py-0.5 leading-tight transition-colors text-muted-foreground hover:text-foreground',
                activeId === entry.id && 'text-foreground font-bold'
              )}
						onclick={(e) => {
							e.preventDefault();
							document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						{entry.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
