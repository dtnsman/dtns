import { UIPanel } from './libs/ui.js';

function MenubarPlay( editor ,mode='normal') {

	const This = this
	this.mode = mode
	const signals = editor.signals;
	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	// let isPlaying = window.g_pla

	const title = new UIPanel();
	title.setClass( 'title' );
	
	const tips = '(自由视角)'
	const now_play_title = This.mode=='normal' ? strings.getKey( 'menubar/play' ):'启动'+tips 
	const now_stop_title =  This.mode=='normal' ? strings.getKey( 'menubar/play/stop' ) : '暂停'+tips
	title.setTextContent( now_play_title ) ;
	title.onClick( function () {
		if(window.isPlaying && window.g_3dplayer_mode != This.mode)
		{
			return console.log('player is running, g_3dplayer_mode{'+ window.g_3dplayer_mode+'}!=this.mode{'+This.mode+'}')
		}

		if ( !window.isPlaying ) {

			window.isPlaying = true;
			window.g_3dplayer_mode = This.mode 
			if(typeof g_3d_player_showMode=='function') g_3d_player_showMode(This.mode)
			title.setTextContent( now_stop_title );
			signals.startPlayer.dispatch();

		} else {

			window.isPlaying = false;
			title.setTextContent( now_play_title );
			signals.stopPlayer.dispatch();

		}

	} );
	container.add( title );

	return container;

}

export { MenubarPlay };
