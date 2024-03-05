import Image from "next/image";

interface CollectionBoxProps {
  image: string;
  label: string;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({ image, label }) => {
  return (
    <div
      className={`
            relative
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            transition
            cursor-pointer
            col-span-12
            sm:col-span-7
      `}
    >
      <Image
        className="object-cover w-[600px] h-[330px] rounded-lg"
        alt=""
        width={600}
        height={330}
        src={image}
      />
      <div>
        <div className="w-[600px] font-bold text-2xl">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;
