<script lang="ts">
	import QrCode from '$lib/QrCode.svelte';
	let text = '';
</script>

<input type="text" bind:value={text} placeholder="QRcode text (random)" />
<QrCode
	{text}
	style="max-width: 90vmin; max-height: 90vmin; margin: 0 auto;"
	on:collapse={() =>
		alert(`
    ₍₍⁽⁽🔳₎₎⁾⁾

見て！QRコードが踊っているよ
かわいいね

        🔳

みんながQRコードの黒い部分を消してしまったので、QRコードは踊るのをやめてしまいました
お前のせいです
あ〜あ`)}
	on:removeblock={() => console.log('block removed')}
/>
