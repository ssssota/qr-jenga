<script lang="ts">
	import QrCodeJenga from '$lib/QrCodeJenga.svelte';
	let text = '';

	const createRecordText = (removed: number) => `
    ₍₍⁽⁽🔳₎₎⁾⁾

見て！QRコードが踊っているよ
かわいいね

        🔳

みんながQRコードの黒い部分を消してしまったので、QRコードは踊るのをやめてしまいました
お前のせいです
あ〜あ (記録:${removed}個)`;
</script>

<input type="text" bind:value={text} placeholder="QRcode text (random)" />
<QrCodeJenga
	{text}
	style="max-width: 90vmin; max-height: 90vmin; margin: 0 auto;"
	on:collapse={({ detail }) => alert(createRecordText(detail.removed))}
	on:removeblock={() => console.log('block removed')}
/>
