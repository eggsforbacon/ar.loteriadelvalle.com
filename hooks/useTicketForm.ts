import { useState } from "react";

import type { Ticket } from "~/types/ticket";

export function useTicketForm() {
  const [ticket, setTicket] = useState<Ticket>({
    date: null,
    draw: "",
    number: "",
    series: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof Ticket, value: string | Date | null) => {
    setTicket((prev) => ({ ...prev, [field]: value }));
  };

  const handleDatePicked = (date: Date) => {
    handleChange("date", date);
  };

  return {
    ticket,
    showDatePicker,
    setShowDatePicker,
    handleChange,
    handleDatePicked,
  };
}
