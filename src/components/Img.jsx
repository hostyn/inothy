import Image from "next/image";
import styled from "styled-components";

const ImageDiv = styled.div`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  aspect-ratio: ${(props) => props.aspectRatio || "auto"};
  margin: ${(props) => props.margin || "initial"};
  cursor: ${(props) => props.cursor || "inherit"};
  user-select: none;
`;

export default function Img({
  src,
  alt,
  width,
  height,
  aspectRatio,
  margin,
  onClick,
  cursor,
  className,
}) {
  return (
    <ImageDiv
      className={className}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      margin={margin}
      onClick={onClick}
      cursor={cursor}
    >
      <Image src={src} layout="fill" alt={alt} />
    </ImageDiv>
  );
}
