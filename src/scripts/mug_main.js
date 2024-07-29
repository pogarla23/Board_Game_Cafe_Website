// mug_main.js

import * as THREE from "three";
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');

// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Set renderer size to fit the container
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

// Cup (transparent plastic look)
const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(2.5, 2, 6, 32),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    })
);
scene.add(cup);

// Liquid (taro color)
const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 1.9, 6, 32),
    new THREE.MeshPhongMaterial({
        color: 0x9966CC, // Taro purple color
        transparent: true,
        opacity: 0.6
    })
);
liquid.position.y = -0.6;
scene.add(liquid);

// Boba pearls
const boba = new THREE.Group();
for (let i = 0; i < 60; i++) {
    const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x000000 }) // Black color for boba pearls
    );
    const radius = (Math.random() * (1.6 - 0.3)) + 0.3;
    const angle = Math.random() * Math.PI * 2;
    const height = -3.5 + Math.random() * 2.5;
    bead.position.set(radius * Math.cos(angle), height, radius * Math.sin(angle));
    boba.add(bead);
}
scene.add(boba);

// Lid
const lid = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.2, 16, 100),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF, // White lid
        transparent: true,
        opacity: 0.9
    })
);
lid.position.y = 3;
lid.rotation.x = Math.PI / 2;
scene.add(lid);

// Straw (green color)
const straw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0x00FF00 }) // Green color for straw
);
straw.position.set(0, 1.5, 0);
straw.rotation.z = -0.1;
scene.add(straw);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

camera.position.set(0, 8, 12);
camera.lookAt(scene.position);

// Variables to store mouse position and movement state
let mouseX = 0, mouseY = 0, isMouseMoving = false;

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    isMouseMoving = true;
}

function onMouseStop() {
    isMouseMoving = false;
}

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseout', onMouseStop);
document.addEventListener('mouseleave', onMouseStop);

function animate() {
    requestAnimationFrame(animate);

    if (isMouseMoving) {
        // Rotate the scene based on mouse movement
        scene.rotation.y = mouseX * Math.PI; // Adjust the multiplier to control the speed
        scene.rotation.x = mouseY * Math.PI / 4; // Adjust the multiplier to control the speed
    } else {
        // Automatic rotation when the mouse is not moving
        scene.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
