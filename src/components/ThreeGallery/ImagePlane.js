import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function ImagePlane() {
  let GetTexture = (url) => {
    return useLoader(TextureLoader, url);
  };

  let points = [
    { x: 0, y: 0 },
    { x: -16, y: -18 },
    { x: 20, y: -17 },
    { x: 30, y: 13 },
    { x: -24, y: 0 },
    { x: -13, y: 16 },
    { x: 8, y: 16 },
    { x: 38, y: -10 },
    { x: 3, y: -18 },
    { x: 18, y: 0 },
    { x: 43, y: 3 },
    { x: -43, y: 3 },
    { x: -38, y: -10 },
  ];

  let data = [
    "https://picsum.photos/id/400/1920/1920",
    "https://picsum.photos/id/223/1920/1920",
    "https://picsum.photos/id/321/1920/1920",
    "https://picsum.photos/id/467/1920/1920",
    "https://picsum.photos/id/538/1920/1920",
    "https://picsum.photos/id/71/1920/1920",
    "https://picsum.photos/id/60/1920/1920",
    "https://picsum.photos/id/89/1920/1920",
    "https://picsum.photos/id/223/1920/1920",
    "https://picsum.photos/id/321/1920/1920",
    "https://picsum.photos/id/467/1920/1920",
    "https://picsum.photos/id/538/1920/1920",
    "https://picsum.photos/id/71/1920/1920",
  ];

  return (
    <>
      {data.map((i, index) => {
        const texture = GetTexture(i);
        return (
          <mesh key={index} position={[points[index].x, points[index].y, 30]}>
            <planeGeometry args={[9, 9]} /> {/* Adjust the size of the plane */}
            <meshBasicMaterial map={texture} />
          </mesh>
        );
      })}
    </>
  );
}

export default ImagePlane;
