import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const wasmBuffer = readFileSync('node_modules/svg2png-wasm/svg2png_wasm_bg.wasm');

export const get: RequestHandler = () => {
	return {
		body: wasmBuffer,
		headers: { 'content-type': 'application/wasm' }
	};
};
