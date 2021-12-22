<script lang="ts">
	import QrCodeJenga from '$lib/QrCodeJenga.svelte';
	import 'water.css/out/light.css';
	let text = '';
	let autoJudge = true;

	const createRecordText = (removed: number) => `
    ₍₍⁽⁽🔳₎₎⁾⁾

見て！QRコードが踊っているよ
かわいいね

        🔳

みんながQRコードの黒い部分を消してしまったので、QRコードは踊るのをやめてしまいました
お前のせいです
あ〜あ (記録:${removed}個)`;
</script>

<header>
	<h1>QRcode Jenga</h1>
</header>
<main>
	<p>
		<input type="text" bind:value={text} placeholder="QRcode text (random)" />
	</p>
	<p>
		<label>
			<input type="checkbox" bind:checked={autoJudge} />
			Auto judge (自分のスマホで判定する場合はチェックを外してください)
		</label>
	</p>
	<QrCodeJenga
		{text}
		{autoJudge}
		style="max-width: 90vmin; max-height: 90vmin; margin: 0 auto;"
		color="#246"
		on:collapse={({ detail }) => alert(createRecordText(detail.removed))}
		on:removeblock={() => console.log('block removed')}
	/>
</main>
