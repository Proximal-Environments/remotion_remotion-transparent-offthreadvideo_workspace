import {expect, test} from 'bun:test';
import {startLongRunningCompositor} from '../../renderer/src/compositor/compositor';
import * as path from 'path';

const transparentVideo = path.join(__dirname, '../../example/public/transparent-with-dar.webm');

test('Should extract PNG when transparent flag is true', async () => {
	const compositor = startLongRunningCompositor({
		maximumFrameCacheItemsInBytes: null,
		logLevel: 'info',
		indent: false,
		binariesDirectory: null,
		extraThreads: 2,
	});

	const data = await compositor.executeCommand('ExtractFrame', {
		src: transparentVideo,
		original_src: transparentVideo,
		time: 0.5,
		transparent: true,
		tone_mapped: true,
	});

	// PNG magic bytes: 89 50 4E 47 (or \x89PNG)
	const isPng = data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e;

	// BMP magic bytes: 42 4D (or BM)
	const isBmp = data[0] === 0x42 && data[1] === 0x4d;

	// With the bug: should return BMP (isBmp = true)
	// Once fixed: should return PNG (isPng = true)
	expect(isPng).toBe(true);
	expect(isBmp).toBe(false);

	await compositor.finishCommands();
	await compositor.waitForDone();
});

test('Should extract BMP when transparent flag is false', async () => {
	const compositor = startLongRunningCompositor({
		maximumFrameCacheItemsInBytes: null,
		logLevel: 'info',
		indent: false,
		binariesDirectory: null,
		extraThreads: 2,
	});

	const data = await compositor.executeCommand('ExtractFrame', {
		src: transparentVideo,
		original_src: transparentVideo,
		time: 0.5,
		transparent: false,
		tone_mapped: true,
	});

	// BMP magic bytes: 42 4D (or BM)
	const isBmp = data[0] === 0x42 && data[1] === 0x4d;

	// Should always return BMP when transparent is false
	expect(isBmp).toBe(true);

	await compositor.finishCommands();
	await compositor.waitForDone();
});

