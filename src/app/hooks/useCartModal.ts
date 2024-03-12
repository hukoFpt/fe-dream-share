import { create } from "zustand";

interface CartModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseCartModal = create<CartModalStore>((set) => ({
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

export default UseCartModal;
