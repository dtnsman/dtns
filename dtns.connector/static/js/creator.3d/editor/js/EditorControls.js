import * as THREE from '../../build/three.module.js';

class EditorControls extends THREE.EventDispatcher {

	constructor( object, domElement ) {

		super();

		// API

		this.enabled = true;
		this.center = new THREE.Vector3();
		this.panSpeed = 0.002;
		this.zoomSpeed = 0.1;
		this.rotationSpeed = 0.005;

		// internals

		var scope = this;
		this.dom = domElement
		var vector = new THREE.Vector3();
		var delta = new THREE.Vector3();
		var box = new THREE.Box3();

		var STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2 };
		var state = STATE.NONE;

		var center = this.center;
		var normalMatrix = new THREE.Matrix3();
		var pointer = new THREE.Vector2();
		var pointerOld = new THREE.Vector2();
		var spherical = new THREE.Spherical();
		var sphere = new THREE.Sphere();

		// events

		var changeEvent = { type: 'change' };

		this.focus = function ( target ) {

			var distance;

			box.setFromObject( target );

			if ( box.isEmpty() === false ) {

				box.getCenter( center );
				distance = box.getBoundingSphere( sphere ).radius;

			} else {

				// Focusing on an Group, AmbientLight, etc

				center.setFromMatrixPosition( target.matrixWorld );
				distance = 0.1;

			}

			delta.set( 0, 0, 1 );
			delta.applyQuaternion( object.quaternion );
			delta.multiplyScalar( distance * 4 );

			object.position.copy( center ).add( delta );

			scope.dispatchEvent( changeEvent );

			//2024-3-8新增
			//if(window.g_3d_editor_stop_player_flag)//更新玩家摄像机位置（以便启用玩家摄像机时，能直接定位到更新点）
			{
				let {x,y,z} = scope.center
				scope.player.position.set(x,scope.player.position.y,z)
			}
		};

		this.pan = function ( delta ) {

			var distance = object.position.distanceTo( center );

			delta.multiplyScalar( distance * scope.panSpeed );
			delta.applyMatrix3( normalMatrix.getNormalMatrix( object.matrix ) );

			object.position.add( delta );
			center.add( delta );

			scope.dispatchEvent( changeEvent );

		};

		this.zoom = function ( delta ) {

			var distance = object.position.distanceTo( center );

			delta.multiplyScalar( distance * scope.zoomSpeed );

			if ( delta.length() > distance ) return;

			delta.applyMatrix3( normalMatrix.getNormalMatrix( object.matrix ) );

			object.position.add( delta );

			scope.dispatchEvent( changeEvent );

		};

		this.rotate = function ( delta ) {

			vector.copy( object.position ).sub( center );

			spherical.setFromVector3( vector );

			spherical.theta += delta.x * scope.rotationSpeed;
			spherical.phi += delta.y * scope.rotationSpeed;

			spherical.makeSafe();

			vector.setFromSpherical( spherical );

			object.position.copy( center ).add( vector );

			object.lookAt( center );

			scope.dispatchEvent( changeEvent );

		};

		//

		function onPointerDown( event ) {

			if ( scope.enabled === false ) return;

			switch ( event.pointerType ) {

				case 'mouse':
				case 'pen':
					onMouseDown( event );
					break;

				// TODO touch

			}

			domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
			domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );

		}

		function onPointerMove( event ) {

			if(!window.g_3d_editor_stop_player_flag) //停止了，才允许该事件！
				return 
			if ( scope.enabled === false ) return;

			switch ( event.pointerType ) {

				case 'mouse':
				case 'pen':
					onMouseMove( event );
					break;

				// TODO touch

			}

		}

		function onPointerUp( event ) {

			switch ( event.pointerType ) {

				case 'mouse':
				case 'pen':
					onMouseUp();
					break;

				// TODO touch

			}

			domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
			domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

		}

		// mouse

		function onMouseDown( event ) {

			if ( event.button === 0 ) {

				state = STATE.ROTATE;

			} else if ( event.button === 1 ) {

				state = STATE.ZOOM;

			} else if ( event.button === 2 ) {

				state = STATE.PAN;

			}

			pointerOld.set( event.clientX, event.clientY );

		}

		function onMouseMove( event ) {

			pointer.set( event.clientX, event.clientY );

			var movementX = pointer.x - pointerOld.x;
			var movementY = pointer.y - pointerOld.y;

			if ( state === STATE.ROTATE ) {

				scope.rotate( delta.set( - movementX, - movementY, 0 ) );

			} else if ( state === STATE.ZOOM ) {

				scope.zoom( delta.set( 0, 0, movementY ) );

			} else if ( state === STATE.PAN ) {

				scope.pan( delta.set( - movementX, movementY, 0 ) );

			}

			pointerOld.set( event.clientX, event.clientY );

		}

		function onMouseUp() {

			state = STATE.NONE;

		}

		function onMouseWheel( event ) {

			if(!window.g_3d_editor_stop_player_flag) //停止了，才允许该事件！
				return 

			if ( scope.enabled === false ) return;

			event.preventDefault();

			// Normalize deltaY due to https://bugzilla.mozilla.org/show_bug.cgi?id=1392460
			scope.zoom( delta.set( 0, 0, event.deltaY > 0 ? 1 : - 1 ) );

		}

		function contextmenu( event ) {

			event.preventDefault();

		}

		this.dispose = function () {

			domElement.removeEventListener( 'contextmenu', contextmenu );
			domElement.removeEventListener( 'dblclick', onMouseUp );
			domElement.removeEventListener( 'wheel', onMouseWheel );

			domElement.removeEventListener( 'pointerdown', onPointerDown );

			domElement.removeEventListener( 'touchstart', touchStart );
			domElement.removeEventListener( 'touchmove', touchMove );

		};

		domElement.addEventListener( 'contextmenu', contextmenu );
		domElement.addEventListener( 'dblclick', onMouseUp );
		domElement.addEventListener( 'wheel', onMouseWheel );

		domElement.addEventListener( 'pointerdown', onPointerDown );

		// touch

		var touches = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
		var prevTouches = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

		var prevDistance = null;

		function touchStart( event ) {

			if ( scope.enabled === false ) return;

			switch ( event.touches.length ) {

				case 1:
					touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					break;

				case 2:
					touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					prevDistance = touches[ 0 ].distanceTo( touches[ 1 ] );
					break;

			}

			prevTouches[ 0 ].copy( touches[ 0 ] );
			prevTouches[ 1 ].copy( touches[ 1 ] );

		}


		function touchMove( event ) {

			if(!window.g_3d_editor_stop_player_flag) //停止了，才允许该事件！
				return 

			if ( scope.enabled === false ) return;

			event.preventDefault();
			event.stopPropagation();

			function getClosest( touch, touches ) {

				var closest = touches[ 0 ];

				for ( var touch2 of touches ) {

					if ( closest.distanceTo( touch ) > touch2.distanceTo( touch ) ) closest = touch2;

				}

				return closest;

			}

			switch ( event.touches.length ) {

				case 1:
					touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					scope.rotate( touches[ 0 ].sub( getClosest( touches[ 0 ], prevTouches ) ).multiplyScalar( - 1 ) );
					break;

				case 2:
					touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
					var distance = touches[ 0 ].distanceTo( touches[ 1 ] );
					scope.zoom( delta.set( 0, 0, prevDistance - distance ) );
					prevDistance = distance;


					var offset0 = touches[ 0 ].clone().sub( getClosest( touches[ 0 ], prevTouches ) );
					var offset1 = touches[ 1 ].clone().sub( getClosest( touches[ 1 ], prevTouches ) );
					offset0.x = - offset0.x;
					offset1.x = - offset1.x;

					scope.pan( offset0.add( offset1 ) );

					break;

			}

			prevTouches[ 0 ].copy( touches[ 0 ] );
			prevTouches[ 1 ].copy( touches[ 1 ] );

		}

		domElement.addEventListener( 'touchstart', touchStart );
		domElement.addEventListener( 'touchmove', touchMove );

	}


	initPlayer(c)
	{
		let camera = c, renderer, scene
		let scope = this
		if(typeof g_3d_editor_stop_player_flag == 'undefined')
		window.g_3d_editor_stop_player_flag = false
		// let controls
		let that = this
		let clock = new THREE.Clock()

		let player, activeCamera
		let speed = 6 //移动速度
		let turnSpeed = 2
		let move = {
			forward: 0,
			turn: 0
		}

		let colliders = [] //碰撞物
		let debugMaterial = new THREE.MeshBasicMaterial({
			color:0xff0000,
			wireframe: true
		})

		let arrowHelper1, arrowHelper2
		let joystick //移动设备控制器

		function init() {
			// createScene()
			// createObjects()
			createColliders()
			createPlayer()
			createCamera()
			// createLights()
			//createLightHelpers()
			//createControls()
			createEvents()
			createJoyStick()
			// render()
		}

		function createJoyStick() {
			
			scope.x3deditorJoyStick_instance = new window.x3deditorJoyStick({
				onMove: function(forward, turn) {
					turn = -turn
					if(Math.abs(forward) < 0.3) forward = 0
					if(Math.abs(turn) < 0.1) turn = 0
					move.forward = forward
					move.turn = turn
				}
			})
			if(window.g_3d_editor_stop_player_flag){
				scope.x3deditorJoyStick_instance.circleElement.style.opacity = 0
			}
		}

		function createEvents() {
			document.addEventListener('keydown', onKeyDown)
			document.addEventListener('keyup', onKeyUp)
		}
		function removeEvents()
		{
			document.removeEventListener('keydown', onKeyDown)
			document.removeEventListener('keyup', onKeyUp)
		}

		function createColliders() {
			// const loader = new THREE.GLTFLoader()
			// loader.load(
			// 	'model/collider.glb',
			// 	gltf => {
			// 	gltf.scene.traverse(child => {
			// 		if(child.name.includes('collider')) {
			// 		colliders.push(child)
			// 		}
			// 	})
			// 	colliders.forEach(item=> {
			// 		item.visible = false
			// 		scene.add(item)
			// 	})
			// 	}
			// )
		}

		function onKeyDown(event) {
			switch ( event.code ) {
				case 'ArrowUp':
				case 'KeyW':
				move.forward = 1
				break

				case 'ArrowLeft':
				case 'KeyA':
				move.turn = turnSpeed
				break

				case 'ArrowDown':
				case 'KeyS':
				move.forward = -1
				break

				case 'ArrowRight':
				case 'KeyD':
				move.turn = -turnSpeed
				break
				case 'Space':
				break
			}
		}

		function onKeyUp(event) {
			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW':
				move.forward = 0
				break

				case 'ArrowLeft':
				case 'KeyA':
				move.turn = 0
				break

				case 'ArrowDown':
				case 'KeyS':
				move.forward = 0
				break

				case 'ArrowRight':
				case 'KeyD':
				move.turn = 0
				break

			}
		}

		function createPlayer() {
			const geometry = new THREE.BoxGeometry(1, 2, 1)
			const material = new THREE.MeshBasicMaterial({
				color: 0xff0000,
				wireframe: true
			})
			player = new THREE.Mesh(geometry, material)
			player.name = 'player'
			geometry.translate(0, 1, 0)
			player.position.set(-5, 0, 5)
			//scene.add(player)

			//2024-3-8新增
			scope.player = player
		}

		async function createCamera() {
			let cnt = 30
			while((!window.g_3d_editor  || !g_3d_editor.is_handled_json_ok_flag) && cnt-- >=0)
			{
				await new Promise((reslove)=>setTimeout(reslove,200))//因为存在两次加载的问题
			}
			const back = new THREE.Object3D()
			back.position.set(0, 2, 1)
			back.parent = player
			//player.add(back)
			activeCamera = back

			//2024-3-8新增（与发布的作品的入口摄像机位置一致）
			// if(camera && !window.g_3d_editor_stop_player_flag)
			if(camera)
			{
				let {x,y,z} = camera.position
				player.position.set(x,player.position.y,z)
				that.init_player_pos_flag = true
			}
		}
		function onResize() {
			const w = window.innerWidth
			const h = window.innerHeight
			camera.aspect = w / h
			camera.updateProjectionMatrix()
			renderer.setSize(w, h)
		}

		function render() {
			const dt = clock.getDelta()
			update(dt)
			renderer.render(scene, camera)
			window.requestAnimationFrame(render)
		}

		function update(dt) {
			updatePlayer(dt)
			updateCamera(dt)
		}

		function updatePlayer(dt) {
			const pos = player.position.clone()
			pos.y += 2
			let dir = new THREE.Vector3()
			
			player.getWorldDirection(dir)
			dir.negate()

			if (move.forward < 0) dir.negate()
			let raycaster = new THREE.Raycaster(pos, dir)
			let blocked = false

			if(colliders.length > 0) {
				const intersect = raycaster.intersectObjects(colliders)
				if (intersect.length > 0) {
				if (intersect[0].distance < 1) {
					blocked = true
				}
				}
			}

			// if(colliders.length > 0) {
			//   //左方向碰撞监测
			//   dir.set(-1, 0, 0)
			//   dir.applyMatrix4(player.matrix)
			//   dir.normalize()
			//   raycaster = new THREE.Raycaster(pos, dir)

			//   let intersect = raycaster.intersectObjects(colliders)
			//   if(intersect.length > 0) {
			//     if(intersect[0].distance < 2) {
			//       player.translateX(2 - intersect[0].distance)
			//     }
			//   }

			//   //右方向碰撞监测
			//   dir.set(1, 0, 0)
			//   dir.applyMatrix4(player.matrix)
			//   dir.normalize()
			//   raycaster = new THREE.Raycaster(pos, dir)

			//   intersect = raycaster.intersectObjects(colliders)
			//   if(intersect.length > 0) {
			//     if(intersect[0].distance < 2) {
			//       player.translateX(intersect[0].distance - 2)
			//     }
			//   }
			// }
			
			if(!blocked) {
				if(move.forward !== 0) { 
				if (move.forward > 0) {
					player.translateZ(-dt * speed)
				} else {
					player.translateZ(dt * speed * 0.5)
				}
				}
			}

			if(move.turn !== 0) {
				player.rotateY(move.turn * dt)
			}
		}

		function updateCamera(dt) {
			//更新摄像机
			camera.position.lerp(
				activeCamera.getWorldPosition(
				new THREE.Vector3()
				), 
				0.08
			)
			const pos = player.position.clone()
			pos.y += 2 
			camera.lookAt(pos)
		}

		that.setPlayerControlCamera = function(c){
			camera = c
		}
		that.updatePlayer = function(dt)
		{
			if(window.g_3d_editor_stop_player_flag) return false
			if(!that.init_player_pos_flag) return false
			updatePlayer(dt)
			updateCamera(dt)
		}
		that.stopPlayer = function()
		{
			window.g_3d_editor_stop_player_flag = true
			removeEvents()
			scope.x3deditorJoyStick_instance.circleElement.style.opacity = 0
		}
		window.g_3d_editor_stop_player = that.stopPlayer
		that.startPlayer = function()
		{
			if(camera)
			{
				let {x,y,z} = camera.position
				player.position.set(x,player.position.y,z)
			}
			window.g_3d_editor_stop_player_flag = false
			createEvents()
			scope.x3deditorJoyStick_instance.circleElement.style.opacity = 1
		}
		window.g_3d_editor_start_player = that.startPlayer

		that.setCollider = function(object,flag)
		{
			console.log('setCollider:',object,flag)
			if(flag){//add 
				if(colliders.indexOf(object)<0) colliders.push(object)
			}else{
				//del
				if(colliders.indexOf(object)>=0)
				{
					let newColliders = []
					for(let i=0;i<colliders.length;i++)
					{
						if(object == colliders[i]) continue
						newColliders.push(colliders[i])
					}
					colliders = newColliders
				}
			}
		}
		window.g_3d_editor_set_collider = that.setCollider

		// ( function () {
			const touchEnabled = !!('ontouchstart' in window);
			class x3deditorJoyStick {
			
				constructor(options) {
					this.createDom()
					this.maxRadius = options.maxRadius || 40
					this.maxRadiusSquared = this.maxRadius * this.maxRadius
					this.onMove = options.onMove
					this.game = options.game
					this.origin = {
					left: this.domElement.offsetLeft,
					top: this.domElement.offsetTop
					}
					console.log(this.origin)
					this.rotationDamping = options.rotationDamping || 0.06
					this.moveDamping = options.moveDamping || 0.01
					this.createEvent()
				}
		
				createEvent() {
					const joystick = this
					if(touchEnabled) {
						window.x3deditorJoyStick_touchstart = function(e) {
							console.log('touchstart...')
							// e.preventDefault()
							joystick.tap(e)
							// e.stopPropagation()
						}
						this.domElement.addEventListener('touchstart', window.x3deditorJoyStick_touchstart)
					} else {
						window.x3deditorJoyStick_mousedown = function(e) {
							// e.preventDefault()
							console.log('mousedown...')
							joystick.tap(e)
							// e.stopPropagation()
						}
						this.domElement.addEventListener('mousedown',window.x3deditorJoyStick_mousedown )
					}
				}
		
				getMousePosition(e) {
					const clientX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX
						const clientY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY
						return {
					x:clientX, 
					y:clientY
					}
				}
		
				tap(e) {
					this.offset = this.getMousePosition(e)
					const joystick = this
					this.onTouchMoved = function(e) {
					// e.preventDefault()
					joystick.move(e)
					}
					this.onTouchEnded = function(e) {
					// e.preventDefault()
					joystick.up(e)
					}
					if(touchEnabled) {
					document.addEventListener('touchmove', this.onTouchMoved)
					document.addEventListener('touchend', this.onTouchEnded)
					} else {
					document.addEventListener('mousemove', this.onTouchMoved)
					document.addEventListener('mouseup', this.onTouchEnded)
					}
				}
		
				move(e) {
					if(window.g_3d_editor_stop_player_flag) return 
						const mouse = this.getMousePosition(e)
		
						let left = mouse.x - this.offset.x
						let top = mouse.y - this.offset.y
		
						const sqMag = left * left + top * top
		
						if (sqMag > this.maxRadiusSquared){
							const magnitude = Math.sqrt(sqMag)
							left /= magnitude
							top /= magnitude
							left *= this.maxRadius
							top *= this.maxRadius
						}
		
						this.domElement.style.top = `${ top + this.domElement.clientHeight / 2 }px`
						this.domElement.style.left = `${ left + this.domElement.clientWidth / 2 }px`
						
						const forward = -(top - this.origin.top + this.domElement.clientHeight / 2) / this.maxRadius
						const turn = (left - this.origin.left + this.domElement.clientWidth / 2) / this.maxRadius
		
					if(this.onMove) {
					this.onMove(forward, turn)
					}
		
				}
		
				up() {
						if (touchEnabled){
					document.removeEventListener('touchmove', this.onTouchMoved)
					document.removeEventListener('touchend', this.onTouchEned)
						}else{
							document.removeEventListener('mousemove', this.onTouchMoved)
					document.removeEventListener('mouseup', this.onTouchEned)
						}
						this.domElement.style.top =  '17px'//`${this.origin.top}px` //fix the bug 2024-3-8
						this.domElement.style.left = '18px'//`${this.origin.left}px`
					if(this.onMove) {
					this.onMove(0, 0)
					}
					if(!window.g_3d_editor_stop_player_flag){
						scope.focus(camera)
					}
				}
				
				createDom() {
					const circle = document.createElement('div')
					circle.style.cssText = `
					position: absolute;
					bottom: 35px;
					width: 80px;
					height: 80px;
					background: rgba(126, 126, 126, 0.2);
					border: #444 solid medium;
					border-radius: 50%;
					left: 50%;
					transform: translateX(-50%);
					`
					const thumb = document.createElement('div')
					thumb.style.cssText = `
					position: absolute;
					left: 18px;
					top: 17px;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					background: #fff;
					`
					circle.appendChild(thumb)
					// document.body.appendChild(circle)
					const container = scope.dom//document.querySelector('#vrgallery_container')
					container.appendChild(circle)
					this.domElement = thumb
					thumb.addEventListener('dblclick',function(){
						console.log('JoyStick-dblclick is clicked!')
						window.history.go(-1)
					})
					this.circleElement = circle
					window.x3deditor_joystickCicle = circle
				} 
			}
		
			window.x3deditorJoyStick = x3deditorJoyStick;
		// } )();

		init()
	}

}

export { EditorControls };
