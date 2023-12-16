import dayjs from 'dayjs';
import { create } from 'zustand';

export type TBill = {
  name: string;
  serviceId: string;
  date: string;
  startTime: string;
  serviceName: string;
  price: number;
};

interface BillStore {
  bill: TBill | null;
  billLog: number;
  resetHandler: Function;
  addToBill: (bill: TBill) => void;
  addBillResetHandler: (handler: Function) => void;
  undoBill: () => void;
  clearBill: () => void;
}

const useBill = create<BillStore>((set, get) => ({
  bill: null,
  billLog: dayjs().valueOf(),
  resetHandler: () => {},
  addToBill: (billData) => set({ bill: billData }),
  addBillResetHandler: (handler) => set({ resetHandler: handler }),
  undoBill: () => set({ bill: null }),
  clearBill: () => {
    set({ billLog: dayjs().valueOf() });
    get().resetHandler();
    set({ bill: null });
  },
}));

export default useBill;
