"use client";

interface ContainerProps {
  children: React.ReactNode;
  zIndex?: number;
}

const Container: React.FC<ContainerProps> = ({ children, zIndex = 10 }) => {
  return (
    <div
      className={`
        z-${zIndex}
        relative
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-10
        sm:px-2
        px-4
      `}
    >
      {children}
    </div>
  );
};

export default Container;
