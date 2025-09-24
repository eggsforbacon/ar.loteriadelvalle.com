import { create } from "zustand";

import { mapParsedToTicket, Ticket } from "~/types/wallet";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WalletState {
  newImageUrl: string;
  setNewImageUrl: (newImageUrl: string) => void;
  newNumber: string;
  setNewNumber: (newNumber: string) => void;
  newRaffle: string;
  setNewRaffle: (newRaffle: string) => void;
  newDate: Date;
  setNewDate: (date: Date) => void;
  newSeries: string;
  setNewSeries: (newSeries: string) => void;
  newFractions: string[];
  setNewFractions: (newFractions: string[]) => void;
  submitNewTicket: () => void;
  tickets: Ticket[];
  loadTickets: (storedTickets: string) => void;
  resetNew: () => void;
  getTicket: (number: string) => Ticket;
  deleteTicket: (number: string) => void;
}

export const EmptyTicket: Ticket = {
  imageUri: "",
  number: "",
  raffle: "",
  date: new Date(Date.now()),
  series: "",
  fractions: [],
};

export const useWalletStore = create<WalletState>((set, getState) => ({
  newImageUrl: "",
  setNewImageUrl: (newImageUrl: string) => set((_) => ({ newImageUrl })),
  newNumber: "",
  setNewNumber: (newNumber: string) => set((_) => ({ newNumber })),
  newRaffle: "",
  setNewRaffle: (newRaffle: string) => set((_) => ({ newRaffle })),
  newDate: new Date(Date.now()),
  setNewDate: (date: Date) => set((_) => ({ newDate: date })),
  newSeries: "",
  setNewSeries: (newSeries: string) => set((_) => ({ newSeries })),
  newFractions: [],
  setNewFractions: (newFractions: string[]) => set((_) => ({ newFractions })),
  tickets: [],
  loadTickets: (storedTickets: string) =>
    set((_) => {
      const parsed = JSON.parse(storedTickets);
      const mappedArray = mapParsedToTicket(parsed);
      return { tickets: mappedArray };
    }),
  resetNew: () =>
    set((_) => {
      return {
        newImageUrl: EmptyTicket.imageUri,
        newNumber: EmptyTicket.number,
        newRaffle: EmptyTicket.raffle,
        newDate: EmptyTicket.date,
        newSeries: EmptyTicket.series,
        newFractions: EmptyTicket.fractions,
      };
    }),
  submitNewTicket: () =>
    set((state) => {
      const newTicket: Ticket = {
        imageUri: state.newImageUrl,
        number: state.newNumber,
        series: state.newSeries,
        raffle: state.newRaffle,
        date: state.newDate,
        fractions: state.newFractions,
      };
      state.resetNew();
      const newTickets = state.tickets.concat(newTicket);
      return {
        tickets: newTickets,
      };
    }),
  getTicket: (number: string) => {
    return getState().tickets.find((t) => t.number === number) || EmptyTicket;
  },
  deleteTicket: (number: string) =>
    set((state) => {
      const filteredTix = state.tickets.filter((t) => t.number !== number);
      AsyncStorage.setItem("tickets", JSON.stringify(filteredTix));
      return {
        tickets: filteredTix,
      };
    }),
}));
