// const APP_NAME = 'Ask2Peer';

export default function logger($message, $color = 'w') {
	let styles = ['color: green'].join(';');

	let $return = $message;

	switch ($color) {
		case 'i': $return = console.info('%c%s', styles, $message); break;
		case 'd': $return = console.debug('%c%s', styles, $message); break;
		case 'w': $return = console.warn('%c%s', styles, $message); break;
		case 'e': $return = console.error('%c%s', styles, $message); break;
		default: $return = console.log('%c%s', styles, $message); break;
	}

	return $return;
}
