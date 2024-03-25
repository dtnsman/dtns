import { Command } from '../Command.js';
import { ObjectLoader } from '../../../build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
class AddObjectCommand extends Command {

	constructor( editor, object ) {

		super( editor );

		this.type = 'AddObjectCommand';

		this.object = object;
		if ( object !== undefined ) {

			this.name = `Add Object: ${object.name}`;

		}

		//2024-3-8新增
		let {x,y,z} = editor.editor_controlls_instance.center
		this.object.position.set(x,y,z)

		console.log('editor.editor_controlls_instance.player.position:',editor.editor_controlls_instance.player.position)
		if(window.g_3d_editor_stop_player_flag && editor.editor_controlls_instance &&editor.editor_controlls_instance.player)//更新玩家摄像机位置（以便启用玩家摄像机时，能直接定位到更新点）
		editor.editor_controlls_instance.player.position.set(x,editor.editor_controlls_instance.player.position.y,z)
		setTimeout(()=>editor.editor_controlls_instance.focus(this.object),100)

	}

	execute() {

		this.editor.addObject( this.object );
		this.editor.select( this.object );

	}

	undo() {

		this.editor.removeObject( this.object );
		this.editor.deselect();

	}

	toJSON() {

		const output = super.toJSON( this );

		output.object = this.object.toJSON();

		return output;

	}

	fromJSON( json ) {

		super.fromJSON( json );

		this.object = this.editor.objectByUuid( json.object.object.uuid );

		if ( this.object === undefined ) {

			const loader = new ObjectLoader();
			this.object = loader.parse( json.object );

		}

	}

}

export { AddObjectCommand };
