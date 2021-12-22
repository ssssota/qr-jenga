<script lang="ts">
	import { base } from '$app/paths';

	import QrJenga from '$lib/QrJenga.svelte';
	import 'water.css/out/light.css';
	let text = '';
	let autoJudge = true;

	const createRecordText = (removed: number) => `
    ₍₍⁽⁽🔳₎₎⁾⁾

見て！QRが踊っているよ
かわいいね

        🔳

みんながQRの黒い部分を消してしまったので、QRは踊るのをやめてしまいました
お前のせいです
あ〜あ (記録:${removed}個)`;
</script>

<svelte:head>
	<title>QR Jenga</title>
	<link rel="icon" href="{base}/favicon.png" />
	<meta property="og:title" content="QRジェンガ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ssssota.github.io/qr-jenga/" />
	<meta property="og:image" content="https://ssssota.github.io/qr-jenga/favicon.png" />
	<meta property="og:site_name" content="QRジェンガ" />
</svelte:head>

<header>
	<h1>QRcode Jenga</h1>
</header>
<main>
	<p>
		<input type="text" bind:value={text} placeholder="QR text (random)" />
	</p>
	<p>
		<label>
			<input type="checkbox" bind:checked={autoJudge} />
			Auto judge (自分のスマホで判定する場合はチェックを外してください)
		</label>
	</p>
	<QrJenga
		{text}
		{autoJudge}
		style="max-width: 90vmin; max-height: 90vmin; margin: 0 auto;"
		color="#246"
		on:collapse={({ detail }) => alert(createRecordText(detail.removed))}
		on:removeblock={() => console.log('block removed')}
	/>
</main>
