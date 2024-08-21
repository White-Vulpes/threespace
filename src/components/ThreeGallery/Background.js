import React from "react";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { OrbitControls, Wireframe } from "@react-three/drei";
import gsap from "gsap";

function Background() {
  const sphereRef = useRef(null);
  const orbitRef = useRef(null);
  let mDown = false;

  useEffect(() => {
    let frameId;
    let animate = () => {
      if (sphereRef.current) {
        if (sphereRef.current.position.y < 5)
          sphereRef.current.rotation.x += 0.001;
        sphereRef.current.rotation.y += 0.001;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  function isPointInsideCircle(x, y, radius) {
    const distanceSquared = x ** 2 + y ** 2;
    return distanceSquared <= radius ** 2;
  }

  const handleOrbitRef = (e) => {
    sphereRef.current.position.set(
      e.target.target.x,
      e.target.target.y,
      e.target.target.z
    );

    let x = orbitRef.current.object.position.x;
    let y = orbitRef.current.object.position.y;
    if (!isPointInsideCircle(x, y, 43)) {
      gsap.to(orbitRef.current.object.position, {
        x: x > 0 ? x - 5 : x + 5,
        y: y > 0 ? y - 5 : y + 5,
        duration: 0.4,
        ease: "expoScale(0.5,7,none)",
      });
      gsap.to(orbitRef.current.target, {
        x: x > 0 ? x - 5 : x + 5,
        y: y > 0 ? y - 5 : y + 5,
        duration: 0.4,
        ease: "expoScale(0.5,7,none)",
      });
      gsap.to(orbitRef.current.object.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.4,
        ease: "expoScale(0.5,7,none)",
      });
      // orbitRef.current.object.position.x = x > 0 ? x - 5 : x + 5;
      // orbitRef.current.object.position.y = y > 0 ? y - 5 : y + 5;
      // orbitRef.current.target.x = x > 0 ? x - 5 : x + 5;
      // orbitRef.current.target.y = y > 0 ? y - 5 : y + 5;
      // orbitRef.current.object.rotation.x = 0;
      // orbitRef.current.object.rotation.y = 0;
      // orbitRef.current.object.rotation.z = 0;
    }
  };

  const onMouseDown = (event) => {
    mDown = true;
    gsap.to(sphereRef.current.scale, {
      x: 22,
      y: 22,
      z: 22,
      duration: 1,
      ease: "power2.out",
    });
  };

  const onMouseUp = (event) => {
    mDown = false;
    gsap.to(sphereRef.current.scale, {
      x: 27,
      y: 27,
      z: 27,
      duration: 1,
      ease: "power2.out",
    });
  };

  const onMouseMove = (event) => {
    if (!mDown) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const mouseX = (clientX / innerWidth) * 2 - 1;
      const mouseY = -(clientY / innerHeight) * 2 + 1;
      if (sphereRef.current) {
        sphereRef.current.rotation.y = THREE.MathUtils.lerp(
          sphereRef.current.rotation.y,
          mouseX * 0.06,
          0.01
        );
        sphereRef.current.rotation.x = THREE.MathUtils.lerp(
          sphereRef.current.rotation.x,
          -mouseY * 0.06,
          0.01
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <>
      <group>
        <ambientLight
          position={[-20, 20, 40]}
          scale={[20, 20, 20]}
          intensity={6}
        />
        <mesh ref={sphereRef} position={[0, 0, 0]} scale={[27, 27, 27]}>
          <icosahedronGeometry args={[1, 3]} />
          <meshPhongMaterial flatShading shininess={1} />
          <Wireframe
            dash={true}
            dashRepeats={9}
            dashLength={0.7}
            squeeze={true}
            squeezeMin={0.1}
            squeezeMax={1}
            fill={"#171717"}
            fillOpacity={0}
            stroke={"#444444"}
            strokeOpacity={1}
            backfaceStroke={"#2c2c2c"}
            colorBackfaces={true}
            thickness={0.09}
            fillMix={1}
            simplify={false}
          />
        </mesh>
        <OrbitControls
          ref={orbitRef}
          onChange={(e) => handleOrbitRef(e)}
          enableRotate={false}
          enableZoom={false}
          enabled={true}
          mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
          touches={{ ONE: THREE.TOUCH.PAN }}
          pa
        ></OrbitControls>
      </group>
    </>
  );
}

export default Background;
