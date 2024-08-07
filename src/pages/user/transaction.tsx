/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import TitlePage from '@/components/TitlePage';
import { columns, Transaction } from '@/components/user/transaction/column';
import { DataTable } from '@/components/user/transaction/data-table';
import { useGetTransactionHistory } from '@/hooks/query';
import LoggedUserLayout from '@/layout/logged-user-layout';

export default function Transaction() {
  const { data: res } = useGetTransactionHistory();

  let dataTable: Transaction[] = [];

  const transactionStatus = {
    success: 'Complete',
    booking: 'Process',
  };

  if (res?.data?.length) {
    dataTable = res.data.map((transaction: any) => ({
      id: transaction.id,
      name: transaction.name,
      datetime: dayjs(transaction.createdAt).format('DD-MM-YYYY HH:mm'),
      service: transaction.serviceName,
      status: transactionStatus[transaction.status as keyof typeof transactionStatus],
    }));
  }

  return (
    <LoggedUserLayout>
      <TitlePage>Transaction History - Barberque</TitlePage>
      <div className="bg-#ECF4F3 rounded-2xl overflow-hidden">
        <DataTable columns={columns} data={dataTable} />
      </div>
    </LoggedUserLayout>
  );
}
