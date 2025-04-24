import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactNode } from 'react';
import { create } from 'zustand';

export interface BottomSheetModalState {
  modal: boolean;
  toggleModal: () => void;
  children: ReactNode | ReactNode[] | string;
  setChildren: (children: ReactNode | ReactNode[] | string) => void;
  modalRef: React.RefObject<BottomSheetModal> | null;
  setModalRef: (ref: React.RefObject<BottomSheetModal>) => void;
}

export const useBottomSheetModalStore = create<BottomSheetModalState>((set) => ({
  modal: false,
  toggleModal: () => set((state) => ({ modal: !state.modal })),
  children: [],
  setChildren: (children: ReactNode | ReactNode[] | string) => set((_) => ({ children })),
  modalRef: null,
  setModalRef: (modalRef) => set((_) => ({ modalRef })),
}));
