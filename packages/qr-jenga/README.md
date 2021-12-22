# QR Jenga

QR Jenga is a game.

## Rule

1. Draw QR.
2. Player remove a black block.
3. Check QR readable.
4. readable -> 2 / no -> 5
5. Last player lose.

## Usage

### Install

```sh
npm install qr-jenga
# yarn add qr-jenga
# pnpm add qr-jenga
```

### Use

```js
import { createQrJenga } from 'qr-jenga';

// create game
const qrJenga = createQrJenga('QR TEXT');

// remove block
const [x, y] = [0, 0];
const success = qrJenga.remove(x, y);

// check collapse(readable)
if (success) {
	console.log('readable!');
	// -> next step!
} else {
	console.log('COLLAPSE!');
}

// render
for (let x = 0; x < qrJenga.size; x++) {
	for (let y = 0; y < qrJenga.size; y++) {
		const pixelIsBlack = qrJenga.get(x, y);
		// render pixel
	}
}
```

## LICENSE

MIT
