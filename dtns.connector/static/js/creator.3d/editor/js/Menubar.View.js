import { UIPanel, UIRow } from './libs/ui.js';

function MenubarView( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	const title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/view' ) );
	container.add( title );

	const options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	let optionRecord = new UIRow();
	optionRecord.setClass( 'option' );
	optionRecord.setTextContent( '录制record' );
	window.g_editor_recording = false
	optionRecord.onClick( function () {
		if(g_editor_recording)
		{
			optionRecord.setTextContent( '录制record' );
			window.g_editor_recording = false

			if(window.isPlaying)
			{
				if(typeof g_3d_player_stop_record=='function'){
					let fileBlob = g_3d_player_stop_record()
					console.log('call g_3d_player_stop_record-fileBlob:',fileBlob)
					if(typeof g_3d_editor_stop_record_push_dweb =='function')
					{
						g_3d_editor_stop_record_push_dweb(fileBlob,true)
					}
				}
			}
			else if(typeof g_3d_editor_stop_record=='function') {
				let fileBlob = g_3d_editor_stop_record()
				console.log('call g_3d_editor_stop_record-fileBlob:',fileBlob)
				if(typeof g_3d_editor_stop_record_push_dweb == 'function')
				{
					g_3d_editor_stop_record_push_dweb(fileBlob)
				}
			}
		}
		else
		{
			optionRecord.setTextContent( '结束录制end' );
			window.g_editor_recording = true
			if(window.isPlaying)
			{
				if(typeof g_3d_player_start_record=='function'){
					g_3d_player_start_record()
				}
			}
			else if(typeof g_3d_editor_start_record=='function') g_3d_editor_start_record()
		}

	} );
	options.add( optionRecord );


	// Fullscreen

	let option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( '玩家视角（关闭/启用）' );
	option.onClick( function () {

		if(window.g_3d_editor_stop_player_flag){
			if(typeof window.g_3d_editor_start_player == 'function'){
				window.g_3d_editor_start_player()
				if(g_dchatManager && g_dchatManager.viewContext){
					g_dchatManager.viewContext.$toast('开启玩家视角！')
				}
			}
		}else{
			if(typeof window.g_3d_editor_stop_player == 'function'){
				window.g_3d_editor_stop_player()
				if(g_dchatManager && g_dchatManager.viewContext){
					g_dchatManager.viewContext.$toast('关闭玩家视角！')
				}
			}
		}

	} );
	options.add( option );


	// Fullscreen

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/view/fullscreen' ) );
	option.onClick( function () {

		if ( document.fullscreenElement === null ) {

			document.documentElement.requestFullscreen();

		} else if ( document.exitFullscreen ) {

			document.exitFullscreen();

		}

		// Safari

		if ( document.webkitFullscreenElement === null ) {

			document.documentElement.webkitRequestFullscreen();

		} else if ( document.webkitExitFullscreen ) {

			document.webkitExitFullscreen();

		}

	} );
	options.add( option );


	//exit 
	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( '返回上页（back）' );
	option.onClick( function () {
		window.history.go(-1)
	} );
	options.add( option );

	// VR (Work in progress)

	if ( 'xr' in navigator ) {

		navigator.xr.isSessionSupported( 'immersive-vr' )
			.then( function ( supported ) {

				if ( supported ) {

					const option = new UIRow();
					option.setClass( 'option' );
					option.setTextContent( 'VR' );
					option.onClick( function () {

						editor.signals.toggleVR.dispatch();

					} );
					options.add( option );

				}

			} );

	}

	return container;

}

export { MenubarView };
