import {getAbsoluteSrc} from '../absolute-src';

export const getOffthreadVideoSource = ({
	src,
	currentTime,
	toneMapped,
}: {
	src: string;
	currentTime: number;
	toneMapped: boolean;
}) => {
	return `http://localhost:${
		window.remotion_proxyPort
	}/proxy?src=${encodeURIComponent(
		getAbsoluteSrc(src),
	)}&time=${encodeURIComponent(Math.max(0, currentTime))}&toneMapped=${String(
		toneMapped,
	)}`;
};
