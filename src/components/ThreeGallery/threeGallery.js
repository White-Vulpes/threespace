import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import ImagePlane from "./ImagePlane";
import Background from "./Background";

extend({ AfterimagePass, EffectComposer, RenderPass });

function AfterimageEffect() {
  const composer = useRef();
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);
    composer.current = new EffectComposer(gl, renderTarget);
    composer.current.addPass(new RenderPass(scene, camera));

    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms["damp"].value = 0.4;
    composer.current.addPass(afterimagePass);

    return () => composer.current.dispose();
  }, [gl, scene, camera, size]);

  useFrame(() => {
    composer.current?.render();
  }, 1);

  return null;
}

function ThreeGallery() {
  const cameraRef = useRef(null);
  const totalMesh = useRef(null);
  const imageRef = useRef(null);

  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const mouseX = (clientX / innerWidth) * 2 - 1;
    const mouseY = -(clientY / innerHeight) * 2 + 1;

    if (imageRef.current) {
      imageRef.current.rotation.y = THREE.MathUtils.lerp(
        imageRef.current.rotation.y,
        -mouseX * 0.03,
        0.05
      );
      imageRef.current.rotation.x = THREE.MathUtils.lerp(
        imageRef.current.rotation.x,
        mouseY * 0.03,
        0.05
      );
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <Canvas
      dpr={window.devicePixelRatio}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 60]} ref={cameraRef} />
      <group ref={totalMesh}>
        <Background />
        <group ref={imageRef}>
          <ImagePlane />
        </group>
      </group>
      <AfterimageEffect />
    </Canvas>
  );
}

export default ThreeGallery;
