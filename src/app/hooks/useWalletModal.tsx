import { create } from "zustand";

interface WalletModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseWalletModal = create<WalletModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseWalletModal;