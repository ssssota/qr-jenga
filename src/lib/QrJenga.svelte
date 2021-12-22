<script context="module" lang="ts">
	export type EventMap = {
		reset: never;
		removeblock: never;
		collapse: { removed: number };
	};
</script>

<script lang="ts">
	import type { QrJengaInterface } from 'qr-jenga';
	import { createQrJenga } from 'qr-jenga';
	import { createEventDispatcher } from 'svelte';
	import { blur } from 'svelte/transition';
	export let text = 'default';
	export let autoJudge = true;
	export let color = 'black';
	const blockSize = 100;
	const dispatch = createEventDispatcher<EventMap>();

	let removed = 0;
	let qrJenga: QrJengaInterface;
	$: {
		qrJenga = createQrJenga(text);
		removed = 0;
		dispatch('reset');
	}
</script>

<div {...$$restProps}>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 {qrJenga.size * blockSize} {qrJenga.size * blockSize}"
		fill={color}
	>
		{#key removed}
			{#each [...Array(qrJenga.size).keys()] as y (y)}
				{#each [...Array(qrJenga.size).keys()] as x (`${x},${y}`)}
					{#if qrJenga.get(x, y)}
						<rect
							out:blur
							x={x * blockSize}
							y={y * blockSize}
							width={blockSize}
							height={blockSize}
							on:click={() => {
								const success = qrJenga.remove(x, y);
								dispatch('removeblock');
								if (!success && autoJudge) dispatch('collapse', { removed });
								removed++;
							}}
						/>
					{/if}
				{/each}
			{/each}
		{/key}
	</svg>
</div>

<style>
	svg {
		width: 100%;
	}
</style>
