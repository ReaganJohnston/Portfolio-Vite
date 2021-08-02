import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Function which controls the main animation and calling of the moving stars
 * Handles the scroll animation
 * And overall compiler of preceding components
 */
function Animate(){
  const clock = new THREE.Clock()
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  //Texture Loader
  const loader = new THREE.TextureLoader();
  const sphere = loader.load('./src/assets/star.png');
  
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth , window.innerHeight);
  camera.position.setZ(1);
  
  renderer.render(scene, camera);
  
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100 )
  const material = new THREE.PointsMaterial({
    size: 0.005,
    map: sphere
  })
  const torus = new THREE.Points(geometry, material);
  
  scene.add(torus)
  
  const pointLight = new THREE.PointLight(0xffffff)
  const ambientLight = new THREE.AmbientLight(0xffffff)
  pointLight.position.set(5, 5, 5)
  
  scene.add(pointLight, ambientLight)
  
  // const controls = new OrbitControls(camera, renderer.domElement);

  const particles = new THREE.BufferGeometry;
  const particlesCount = 5000;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++){
    posArray[i] = (Math.random() - 0.5) * 5
  }

  particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  const particlesMesh = new THREE.Points(particles, material)
  scene.add(particlesMesh);

  //AnimateParticles function caller to be used inside the animate loader
  function animateParticles(event){
    mouseY = event.clientY
    mouseX = event.clientX
  }

  //On mouse wheel, scroll down
  function onMouseWheel(event){
    event.preventDefault();

    camera.position.z -= event.deltaY * 0.0005;
    camera.position.clampScalar( 0, 10 );
  }

  document.addEventListener('wheel', onMouseWheel)
  document.addEventListener('mousemove', animateParticles)
  let mouseX = 0
  let mouseY = 0
  
  //Final function to animate the whole webpage
  function animate(){
    requestAnimationFrame( animate );
  
    // Get the elapsed time and use it as a variable to spin the particles
    const elapsedTime = clock.getDelta()
    particlesMesh.rotation.y += -.1 * elapsedTime


    //Utilise the user's mouse position to rotate the particles in a specific direction
    if( mouseX > 0){
      particlesMesh.rotation.x += - mouseY * (elapsedTime * 0.00012)
      particlesMesh.rotation.y += mouseX * (elapsedTime * 0.00012)
    }
  
    //Rotate the torus object
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  
    renderer.render(scene, camera);
  }
  
  animate();

}

export default Animate()