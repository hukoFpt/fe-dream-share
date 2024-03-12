import { create } from "zustand";

interface ProductModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseProductModal = create<ProductModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening modal");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Closing modal");
    set({ isOpen: false });
  },
}));

export default UseProductModal;
