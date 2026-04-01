<script>
	const tiers = [
		{
			range: [5, 8],
			rounds: [
				{
					name: 'Final',
					teams: '5–8 teams',
					byes: null,
					time: '0.5–1 hr per division'
				}
			]
		},
		{
			range: [9, 16],
			rounds: [
				{
					name: 'Semi Final',
					teams: '1 pool (5–9 teams) or 2 pools (10–12 teams), Seeds 5–16',
					byes: null,
					time: '1–2 hr per division'
				},
				{
					name: 'Final',
					teams: '8 teams',
					byes: 'Seeds 1–4 receive a bye',
					time: '1 hr per division'
				}
			]
		},
		{
			range: [17, 24],
			rounds: [
				{
					name: 'Quarter Final',
					teams: '1 pool (9 teams) or 2 pools (10–16 teams), Seeds 9–24',
					byes: null,
					time: '1–2 hr per division'
				},
				{
					name: 'Semi Final',
					teams: '2 pools, 16 teams',
					byes: null,
					time: '2 hr per division'
				},
				{
					name: 'Final',
					teams: '8 teams',
					byes: null,
					time: '1 hr per division'
				}
			]
		},
		{
			range: [25, 32],
			rounds: [
				{
					name: 'Prelims',
					teams: '1 pool (9 teams) or 2 pools (10–16 teams), Seeds 17–32',
					byes: null,
					time: '1–2 hr per division'
				},
				{
					name: 'Quarter Final',
					teams: '2 pools, 16 teams',
					byes: null,
					time: '2 hr per division'
				},
				{
					name: 'Semi Final',
					teams: '2 pools, 16 teams',
					byes: null,
					time: '2 hr per division'
				},
				{
					name: 'Final',
					teams: '8 teams',
					byes: null,
					time: '1 hr per division'
				}
			]
		},
		{
			range: [33, 64],
			rounds: [
				{
					name: 'Qualifiers',
					teams: '1 pool (up to 10 teams), 2 pools (10–20 teams), or 4 pools (21–40 teams), Seeds 25–64',
					byes: null,
					time: '1–4 hr per division'
				},
				{
					name: 'Prelims',
					teams: '2 pools, 16 teams',
					byes: 'Seeds 17–24 receive a bye',
					time: '2 hr per division'
				},
				{
					name: 'Quarter Final',
					teams: '2 pools, 16 teams',
					byes: null,
					time: '2 hr per division'
				},
				{
					name: 'Semi Final',
					teams: '2 pools, 16 teams',
					byes: null,
					time: '2 hr per division'
				},
				{
					name: 'Final',
					teams: '8 teams',
					byes: null,
					time: '1 hr per division'
				}
			]
		}
	];

	let count = $state(16);

	const activeTier = $derived(
		tiers.find((t) => count >= t.range[0] && count <= t.range[1]) ?? tiers[0]
	);

	function decrement() {
		if (count > 5) count -= 1;
	}

	function increment() {
		if (count < 64) count += 1;
	}

	function handleInput(e) {
		const val = parseInt(e.currentTarget.value, 10);
		if (!isNaN(val)) {
			count = Math.min(64, Math.max(5, val));
		}
	}
</script>

<div class="not-prose space-y-6">
	<!-- Stepper input -->
	<div class="flex items-center gap-3">
		<span class="text-sm font-medium text-foreground">Number of teams:</span>
		<div class="flex items-center gap-1 rounded-md border border-border bg-secondary">
			<button
				onclick={decrement}
				disabled={count <= 5}
				class="flex h-8 w-8 items-center justify-center rounded-l-md text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
				aria-label="Decrease team count"
			>
				−
			</button>
			<input
				type="number"
				min="5"
				max="64"
				value={count}
				oninput={handleInput}
				class="w-12 bg-transparent text-center text-sm font-semibold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				aria-label="Number of teams"
			/>
			<button
				onclick={increment}
				disabled={count >= 64}
				class="flex h-8 w-8 items-center justify-center rounded-r-md text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
				aria-label="Increase team count"
			>
				+
			</button>
		</div>
	</div>

	<!-- Round cards connected by a vertical line -->
	<div class="relative pl-6">
		<!-- Vertical connector line -->
		<div class="absolute left-[11px] top-4 bottom-4 w-px bg-border"></div>

		<div class="space-y-4">
			{#each activeTier.rounds as round, i (round.name)}
				<div class="relative flex gap-4">
					<!-- Dot on the line -->
					<div
						class="absolute -left-6 top-4 h-3 w-3 -translate-x-[1px] rounded-full border-2 border-border bg-background"
					></div>

					<!-- Card -->
					<div class="flex-1 rounded-lg border border-border bg-secondary px-4 py-3">
						<p class="text-sm font-semibold text-foreground">{round.name}</p>
						<p class="mt-0.5 text-sm text-foreground">{round.teams}</p>
						{#if round.byes}
							<p class="mt-0.5 text-sm text-muted-foreground">{round.byes}</p>
						{/if}
						<p class="mt-1 text-xs text-muted-foreground">{round.time}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
