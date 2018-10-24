/**
 * @author monxiaolee
 */
import * as THREE from 'three'

export default function FBXLoader(manager) {
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
}

THREE.FBXLoader.prototype = {
	load: function ( url, onLoad, onProgress, onError ) {
		
		var self = this;

		var resourceDirectory = THREE.LoaderUtils.extractUrlBase( url );

		var loader = new THREE.FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( buffer ) {

			try {

				var scene = self.parse( buffer, resourceDirectory );
				onLoad( scene );

			} catch ( error ) {

				window.setTimeout( function () {

					if ( onError ) onError( error );

					self.manager.itemError( url );

				}, 0 );

			}

		}, onProgress, onError );

	},
}
