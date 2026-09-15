import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./GalaxyBackground.css";

const shaderUtils = `
float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 scatter (vec3 seed) {
  float u = random(seed.xy);
  float v = random(seed.yz);
  float theta = u * 6.28318530718;
  float phi = acos(2.0 * v - 1.0);

  float sinTheta = sin(theta);
  float cosTheta = cos(theta);
  float sinPhi = sin(phi);
  float cosPhi = cos(phi);

  float x = sinPhi * cosTheta;
  float y = sinPhi * sinTheta;
  float z = cosPhi;

  return vec3(x, y, z);
}
`;

export default function GalaxyBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ------------------------ //
    // SETUP SCENE & CAMERA
    const count = 128 ** 2; // 16,384 stars

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    // Camera positioned with slight angle for beautiful 3D tilt
    camera.position.set(0.4, 2.0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent so it layers cleanly
    container.appendChild(renderer.domElement);

    // ------------------------ //
    // STAR ALPHA TEXTURE
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = textureCanvas.height = 32;
    const ctx = textureCanvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 32, 32);

    let grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0.0, "#fff");
    grd.addColorStop(1.0, "#000");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.rect(15, 0, 2, 32);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, 15, 32, 2);
    ctx.fill();

    grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0.1, "#fff");
    grd.addColorStop(0.6, "#000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 32, 32);

    const alphaMap = new THREE.CanvasTexture(textureCanvas);

    // ------------------------ //
    // GALAXY GEOMETRY & MATERIAL
    const galaxyGeometry = new THREE.BufferGeometry();

    const galaxyPosition = new Float32Array(count * 3);
    const galaxySeed = new Float32Array(count * 3);
    const galaxySize = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      galaxyPosition[i * 3] = i / count;
      galaxySeed[i * 3 + 0] = Math.random();
      galaxySeed[i * 3 + 1] = Math.random();
      galaxySeed[i * 3 + 2] = Math.random();
      galaxySize[i] = Math.random() * 2 + 0.5;
    }

    galaxyGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyPosition, 3),
    );
    galaxyGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(galaxySize, 1),
    );
    galaxyGeometry.setAttribute(
      "seed",
      new THREE.BufferAttribute(galaxySeed, 3),
    );

    const innColor = new THREE.Color("#ff4400"); // Inner warm / red core
    const outColor = new THREE.Color("#88aaff"); // Outer blue/starlight arms

    const galaxyVertexShader = `
precision highp float;

attribute vec3 position;
attribute float size;
attribute vec3 seed;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uTime;
uniform float uSize;
uniform float uBranches;
uniform float uRadius;
uniform float uSpin;
uniform float uRandomness;

varying float vDistance;

#define PI  3.14159265359
#define PI2 6.28318530718

${shaderUtils}

void main() {
  vec3 p = position;
  float st = sqrt(p.x);
  float qt = p.x * p.x;
  float mt = mix(st, qt, p.x);

  // Offset positions by spin and branch number
  float angle = qt * uSpin * (2.0 - sqrt(1.0 - qt));
  float branchOffset = (PI2 / uBranches) * floor(seed.x * uBranches);
  p.x = position.x * cos(angle + branchOffset) * uRadius;
  p.z = position.x * sin(angle + branchOffset) * uRadius;

  // Scatter positions & scale down by Y-axis
  p += scatter(seed) * random(seed.zx) * uRandomness * mt;
  p.y *= 0.5 + qt * 0.5;

  // Rotate (center rotates faster)
  vec3 temp = p;
  float ac = cos(-uTime * (2.0 - st) * 0.5);
  float as = sin(-uTime * (2.0 - st) * 0.5);
  p.x = temp.x * ac - temp.z * as;
  p.z = temp.x * as + temp.z * ac;

  vDistance = mt;

  vec4 mvp = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvp;
  gl_PointSize = (10.0 * size * uSize) / -mvp.z;
}
`;

    const galaxyFragmentShader = `
precision highp float;

uniform vec3 uColorInn;
uniform vec3 uColorOut;
uniform sampler2D uAlphaMap;

varying float vDistance;

#define PI  3.14159265359

void main() {
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
  float a = texture2D(uAlphaMap, uv).g;
  if (a < 0.1) discard;

  vec3 color = mix(uColorInn, uColorOut, vDistance);
  float c = step(0.99, (sin(gl_PointCoord.x * PI) + sin(gl_PointCoord.y * PI)) * 0.5);
  color = max(color, vec3(c));

  gl_FragColor = vec4(color, a);
}
`;

    const galaxyMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: renderer.getPixelRatio() },
        uBranches: { value: 2 },
        uRadius: { value: 1.618 },
        uSpin: { value: Math.PI * 2 },
        uRandomness: { value: 0.5 },
        uAlphaMap: { value: alphaMap },
        uColorInn: { value: innColor },
        uColorOut: { value: outColor },
      },
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // ------------------------ //
    // UNIVERSE (SURROUNDING STAR CLUSTER)
    const universeCount = Math.floor(count / 2);
    const universeGeometry = new THREE.BufferGeometry();

    const universePosition = new Float32Array(universeCount * 3);
    const universeSeed = new Float32Array(universeCount * 3);
    const universeSize = new Float32Array(universeCount);

    for (let i = 0; i < universeCount; i++) {
      universeSeed[i * 3 + 0] = Math.random();
      universeSeed[i * 3 + 1] = Math.random();
      universeSeed[i * 3 + 2] = Math.random();
      universeSize[i] = Math.random() * 2 + 0.5;
    }

    universeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(universePosition, 3),
    );
    universeGeometry.setAttribute(
      "seed",
      new THREE.BufferAttribute(universeSeed, 3),
    );
    universeGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(universeSize, 1),
    );

    const universeVertexShader = `
precision highp float;

attribute vec3 seed;
attribute float size;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uTime;
uniform float uSize;
uniform float uRadius;

#define PI  3.14159265359
#define PI2 6.28318530718

${shaderUtils}

// Universe size factor
const float r = 3.0;
// Scale universe sphere 
const vec3 s = vec3(2.1, 1.3, 2.1);

void main() {
  vec3 p = scatter(seed) * r * s;

  // Sweep to center
  float q = random(seed.zx);
  for (int i = 0; i < 3; i++) q *= q;
  p *= q;

  // Sweep to surface
  float l = length(p) / (s.x * r);
  p = l < 0.001 ? (p / l) : p;

  // Rotate (center rotates faster)
  vec3 temp = p;
  float ql = 1.0 - l;
  for (int i = 0; i < 3; i++) ql *= ql;
  float ac = cos(-uTime * ql);
  float as = sin(-uTime * ql);
  p.x = temp.x * ac - temp.z * as;
  p.z = temp.x * as + temp.z * ac;

  vec4 mvp = modelViewMatrix * vec4(p * uRadius, 1.0);
  gl_Position = projectionMatrix * mvp;

  // Scale up core stars
  l = (2.0 - l) * (2.0 - l);
  gl_PointSize = (r * size * uSize * l) / -mvp.z;
}
`;

    const universeFragmentShader = `
precision highp float;

uniform sampler2D uAlphaMap;

#define PI 3.14159265359

void main() {
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
  float a = texture2D(uAlphaMap, uv).g;
  if (a < 0.1) discard;

  gl_FragColor = vec4(vec3(1.0), a);
}
`;

    const universeMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: galaxyMaterial.uniforms.uSize,
        uRadius: galaxyMaterial.uniforms.uRadius,
        uAlphaMap: galaxyMaterial.uniforms.uAlphaMap,
      },
      vertexShader: universeVertexShader,
      fragmentShader: universeFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const universe = new THREE.Points(universeGeometry, universeMaterial);
    scene.add(universe);

    // ------------------------ //
    // INTERACTIVE MOUSE ROTATION & SMOOTH INERTIA
    const mouseState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handlePointerMove = (e) => {
      mouseState.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseState.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    // ------------------------ //
    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      galaxyMaterial.uniforms.uSize.value = renderer.getPixelRatio();
    };

    window.addEventListener("resize", handleResize);

    // ------------------------ //
    // ANIMATION LOOP
    const t = 0.001;
    let clock = 0;

    const animate = () => {
      clock += t;
      galaxyMaterial.uniforms.uTime.value += t * 0.5;
      universeMaterial.uniforms.uTime.value += t * 0.33;

      // Smooth mouse camera sway
      mouseState.x += (mouseState.targetX - mouseState.x) * 0.035;
      mouseState.y += (mouseState.targetY - mouseState.y) * 0.035;

      camera.position.x = 0.4 + mouseState.x * 0.8;
      camera.position.y = 2.0 - mouseState.y * 0.5;
      camera.lookAt(0.2, 0, 0);

      // Slow majestic background axial rotation
      galaxy.rotation.y += 0.0012;
      universe.rotation.y += 0.0004;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // ------------------------ //
    // CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      universeGeometry.dispose();
      universeMaterial.dispose();
      alphaMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="galaxy-canvas-container"
      aria-hidden="true"
    />
  );
}
