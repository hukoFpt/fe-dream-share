import Image from "next/image";

interface CategoryBoxProps {
  image: string;
  label: string;
  selected?: boolean;
  className: string;
}

const CollectionBox: React.FC<CategoryBoxProps> = ({
  image,
  label,
  selected,
  className,
}) => {
  return (
    <div
      className={`
        relative
        hover:outline-2
        hover:outline-black
        z-10
        ${className}            
        transition
        cursor-pointer
      `}
    >
      <Image
        width={393}
        height={250}
        className="object-cover h-[250px] w-[393px] rounded"
        alt=""
        src={image}
      ></Image>
      <div className="absolute bottom-2.5 left-2.5 text-white text-2xl font-black z-10">
        {label}
      </div>
    </div>
  );
};

export default CollectionBox;
