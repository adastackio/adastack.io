import React, { useEffect } from "react";
import * as THREE from "three";
function Animation() {
  useEffect(() => {
    function init() {
      if (!document.getElementById("welcomeCanvas")) {
        return;
      }
      var _options = {
        canvas: document.getElementById("welcomeCanvas"),
        antialias: true,
      };
      var _params = {
        pointLightY: 0,
        cameraShakeY: 0,
        fogColor: 0xfafafa,
        fogMin: 0.015,
        fogMax: 400,
      };
      var AMOUNTX = 100;
      var AMOUNTY = 100;
      var SEPARATION = 10;
      var renderer,
        scene,
        camera,
        pointLight,
        particleSystem,
        count = 0;
      renderer = new THREE.WebGLRenderer(_options);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(830, window.innerHeight);
      renderer.setClearColor(_params.fogColor);
      //
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(
        _params.fogColor,
        _params.fogMin,
        _params.fogMax
      );
      //
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        4700
      );
      camera.position.y = -500;
      camera.position.z = -800;
      //
      pointLight = new THREE.PointLight("rgb(255,250,250)", 0.9);
      pointLight.position.x = 100;
      pointLight.position.z = -350;
      scene.add(pointLight);
      //
      particleSystem = buildParticleSystem();
      particleSystem.position.y = -20;
      particleSystem.rotation.y = 65;
      particleSystem.position.set(
        camera.position.x,
        camera.position.y - 10,
        camera.position.z
      );
      scene.add(particleSystem);
      //		//		//		//		//		//		//		//		//		//		//		//		//		//
      // THIS IS ABOUT MOVING THE CAMERA :D //
      //		//		//		//		//		//		//		//		//		//		//		//		//		//
      //set up state so we know if we are moving forward
      var moveForward = false;
      //define velocity as a vector3
      var velocity = new THREE.Vector3();
      var prevTime = performance.now();
      //moveforward is true when 'up' or 'w' is pressed
      var onKeyDown = function (event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            moveForward = true;
            console.log("onKeyDown! moveForward is now: " + moveForward);
            break;
        }
      };
      //moveforward is false when 'up' or 'w' is not pressed
      var onKeyUp = function (event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            moveForward = false;
            console.log("onKeyUp! moveForward is now: " + moveForward);
            break;
        }
      };
      //make sure our document knows what functions to call when a key is pressed.
      document.addEventListener("keydown", onKeyDown, false);
      document.addEventListener("keyup", onKeyUp, false);
      //time to render the movement every frame.
      function render() {
        renderer.render(scene, camera);
        //moving the camera
        //lets make sure we can move camera smoothly based on user's performance.
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        //reset z velocity to be 0 always. But override it if user presses up or w. See next line...
        velocity.z -= velocity.z * 10.0 * delta;
        //if the user pressed 'up' or 'w', set velocity.z to a value > 0.
        if (moveForward) velocity.z -= 400.0 * delta;
        //pass velocity as an argument to translateZ and call it on camera.
        camera.translateZ(velocity.z * delta);
        prevTime = time;
        //ignore this
        activateParticleWave();
      }
      //		//		//		//		//		//		//		//		//		//		//		//		//		//
      // Look above for stuff regarding moving the camera.
      //		//		//		//		//		//		//		//		//		//		//		//		//		//
      function draw() {
        count += 0.1;
        requestAnimationFrame(draw);
        render();
      }
      function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener("resize", onWindowResize, false);
      function activateParticleWave() {
        particleSystem.geometry.attributes.position.needsUpdate = true;
        var positions = particleSystem.geometry.attributes.position.array;
        for (var i = 0; i < positions.length; i += 3) {
          positions[i + 1] = Math.sin((i / 3 + count) * 0.5) * 3;
        }
      }
      function buildParticleSystem() {
        var positions = [];
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            var x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            var y = 0;
            var z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
            positions.push(x, y, z);
          }
        }
        var particleGeom = new THREE.BufferGeometry();
        particleGeom.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        var particleMaterial = new THREE.PointsMaterial({
          color: 0x000000,
          size: 1.4,
        });
        var system = new THREE.Points(particleGeom, particleMaterial);
        return system;
      }
      draw(); //do all the things
    }
    init();
  }, []);
  return <canvas id="welcomeCanvas" />;
}
export { Animation };

// import React, { useEffect } from "react";
// import * as THREE from "three";

// function Animation() {
//   useEffect(() => {
//     function init() {
//       if (!document.getElementById("welcomeCanvas")) {
//         return;
//       }
//       var _options = {
//         canvas: document.getElementById("welcomeCanvas"),
//         antialias: true,
//       };
//       var _params = {
//         pointLightY: 0,
//         cameraShakeY: 0,
//         fogColor: 0xffd700,
//         fogMin: 0.015,
//         fogMax: 400,
//       };
//       var AMOUNTX = 100;
//       var AMOUNTY = 100;
//       var SEPARATION = 10;
//       var renderer,
//         scene,
//         camera,
//         pointLight,
//         particleSystem,
//         count = 0;

//       renderer = new THREE.WebGLRenderer(_options);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setClearColor(_params.fogColor);

//       //

//       scene = new THREE.Scene();
//       scene.fog = new THREE.Fog(
//         _params.fogColor,
//         _params.fogMin,
//         _params.fogMax
//       );

//       //

//       camera = new THREE.PerspectiveCamera(
//         45,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         4700
//       );
//       camera.position.y = -500;
//       camera.position.z = -800;

//       //

//       pointLight = new THREE.PointLight("rgb(255,250,250)", 0.9);
//       pointLight.position.x = 100;
//       pointLight.position.z = -350;
//       scene.add(pointLight);

//       //

//       particleSystem = buildParticleSystem();
//       particleSystem.position.y = -20;
//       particleSystem.rotation.y = 65;
//       particleSystem.position.set(
//         camera.position.x,
//         camera.position.y - 10,
//         camera.position.z
//       );
//       scene.add(particleSystem);
//       //		//		//		//		//		//		//		//		//		//		//		//		//		//
//       // THIS IS ABOUT MOVING THE CAMERA :D //
//       //		//		//		//		//		//		//		//		//		//		//		//		//		//

//       //set up state so we know if we are moving forward
//       var moveForward = false;

//       //define velocity as a vector3
//       var velocity = new THREE.Vector3();
//       var prevTime = performance.now();

//       //moveforward is true when 'up' or 'w' is pressed
//       var onKeyDown = function (event) {
//         switch (event.keyCode) {
//           case 38: // up
//           case 87: // w
//             moveForward = true;
//             console.log("onKeyDown! moveForward is now: " + moveForward);
//             break;
//         }
//       };

//       //moveforward is false when 'up' or 'w' is not pressed
//       var onKeyUp = function (event) {
//         switch (event.keyCode) {
//           case 38: // up
//           case 87: // w
//             moveForward = false;
//             console.log("onKeyUp! moveForward is now: " + moveForward);
//             break;
//         }
//       };

//       //make sure our document knows what functions to call when a key is pressed.
//       document.addEventListener("keydown", onKeyDown, false);
//       document.addEventListener("keyup", onKeyUp, false);

//       //time to render the movement every frame.
//       function render() {
//         renderer.render(scene, camera);
//         //moving the camera

//         //lets make sure we can move camera smoothly based on user's performance.
//         var time = performance.now();
//         var delta = (time - prevTime) / 1000;

//         //reset z velocity to be 0 always. But override it if user presses up or w. See next line...
//         velocity.z -= velocity.z * 10.0 * delta;
//         //if the user pressed 'up' or 'w', set velocity.z to a value > 0.
//         if (moveForward) velocity.z -= 400.0 * delta;

//         //pass velocity as an argument to translateZ and call it on camera.
//         camera.translateZ(velocity.z * delta);

//         prevTime = time;

//         //ignore this
//         activateParticleWave();
//       }

//       //		//		//		//		//		//		//		//		//		//		//		//		//		//
//       // Look above for stuff regarding moving the camera.
//       //		//		//		//		//		//		//		//		//		//		//		//		//		//

//       function draw() {
//         count += 0.1;
//         requestAnimationFrame(draw);
//         render();
//       }

//       function onWindowResize() {
//         windowHalfX = window.innerWidth / 2;
//         windowHalfY = window.innerHeight / 2;
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//       }
//       window.addEventListener("resize", onWindowResize, false);

//       function activateParticleWave() {
//         particleSystem.geometry.verticesNeedUpdate = true;
//         var i = 0;
//         for (var iy = 0; iy < particleSystem.geometry.vertices.length; iy++) {
//           particleSystem.geometry.vertices[iy].y =
//             Math.sin((iy + count) * 0.5) * 3;
//         }
//       }

//       function buildParticleSystem() {
//         var particleGeom = new THREE.Geometry();
//         for (var ix = 0; ix < AMOUNTX; ix++) {
//           for (var iy = 0; iy < AMOUNTY; iy++) {
//             var vertex = new THREE.Vector3();
//             vertex.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
//             vertex.y = 0;
//             vertex.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
//             particleGeom.vertices.push(vertex);
//           }
//         }
//         var particleMaterial = new THREE.PointsMaterial({
//           color: 0x000000,
//           size: 1.4,
//         });

//         var system = new THREE.Points(particleGeom, particleMaterial);
//         return system;
//       }

//       draw(); //do all the things
//     }

//     init();
//   }, []);
//   return <canvas id="welcomeCanvas" />;
// }

// export { Animation };
