import { browser } from '$app/env';
import { base } from '$app/paths';
import jsqr from 'jsqr';
import { initialize, svg2png } from 'svg2png-wasm';

/**
 * initialize svg2png wasm
 * reject in no browser runtime
 */
const setupPromise = browser
	? initialize(`${base}/svg2png.wasm`)
	: Promise.reject(new Error('Invalid environment'));

/**
 * Detect QRCode and return detected text
 * @param svg SVG string
 * @param svgScale scale
 * @returns detected string
 */
export const detectQrFromSvg = (svg: string, svgScale = 1): Promise<string | undefined> =>
	// wait for wasm initialiing
	setupPromise
		// SVG text into PNG Buffer
		.then(() => svg2png(svg, { scale: 1 / svgScale }))
		// PNG Buffer into image
		.then(
			(pngBuf) =>
				new Promise<HTMLImageElement>((resolve, reject) => {
					const image = document.createElement('img');
					image.onload = () => resolve(image);
					image.onerror = (e) => reject(e);
					image.src = URL.createObjectURL(new Blob([pngBuf], { type: 'image/png' }));
				})
		)
		// image into canvas and detect qr from canvas
		.then((image) => {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			const imageData = context.getImageData(0, 0, image.width, image.height);
			return jsqr(imageData.data, imageData.width, imageData.height)?.data;
		})
		.catch((e) => {
			console.error(e);
			return undefined;
		});
