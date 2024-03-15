import { create } from "zustand";

interface CheckoutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseCheckoutModal = create<CheckoutModalStore>((set) => ({
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

export default UseCheckoutModal;
