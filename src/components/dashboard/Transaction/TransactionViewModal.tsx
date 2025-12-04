import { Button, Divider, Modal, Table } from "antd";
import dayjs from "dayjs";

const TransactionViewModal = ({ open, onClose, transaction }: any) => {

  // Define columns for the transaction details table
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (text: any) => <strong>{text}</strong>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  // Format the data for the table
  const dataSource = [
    {
      key: "buyerName",
      field: "Buyer Name",
      value: transaction?.buyerName,
    },
    {
      key: "transactionDate",
      field: "Transaction Date",
      value: dayjs(transaction?.transactionDate).format("MMMM D, YYYY"),
    },
     {
      key: "transactionId",
      field: "Transaction",
      value: transaction?.transactionId,
     
    },
    {
      key: "Status",
      field: "Status",
      value: (
        <span
          style={{
            color:
              transaction?.status === "Completed"
                ? "green"
                : transaction?.status === "Pending"
                ? "orange"
                : "red",
          }}
        >
          {transaction?.status}
        </span>
      ),
    },       
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      title={<h3 className="text-xl font-semibold text-primary">Transaction Details</h3>}
    >
        <Divider />
      {transaction && (
        <div className="">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false} // Disable pagination
            showHeader={false} // Hide header
            bordered
            rowClassName="transaction-row"
            size="middle"
            className="transaction-table"
          />
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          style={{ borderRadius: "10px", fontWeight: "500", padding: "8px 16px" }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
