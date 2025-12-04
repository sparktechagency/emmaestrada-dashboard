import { EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import TransactionViewModal from "./TransactionViewModal";

const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [openView, setOpenView] = useState(false);

  // Sample data for transactions (you can replace this with real data)
const dataSource = [
  {
    key: 1,
    transactionId: "TXN001", // Add transactionId
    buyerName: "John Smith",
    transactionDate: "2024-01-15",
    action: "View",
    status: "Completed",
  },
  {
    key: 2,
    transactionId: "TXN002", // Add transactionId
    buyerName: "Emma Johnson",
    transactionDate: "2024-02-22",
    action: "View",
    status: "Pending",
  },
  {
    key: 3,
    transactionId: "TXN003", // Add transactionId
    buyerName: "Liam Brown",
    transactionDate: "2024-03-05",
    action: "View",
    status: "Failed",
  },
  {
    key: 4,
    transactionId: "TXN004", // Add transactionId
    buyerName: "Olivia Davis",
    transactionDate: "2024-04-12",
    action: "View",
    status: "Completed",
  },
  {
    key: 5,
    transactionId: "TXN005", // Add transactionId
    buyerName: "Noah Wilson",
    transactionDate: "2024-05-07",
    action: "View",
    status: "Pending",
  },
];

  const columns = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
   
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (transactionDate: string) =>
        dayjs(transactionDate).format("MMMM D, YYYY"), // Formatting the date
    },
     {
      title: "Transaction",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "Completed" ? "green" : status === "Pending" ? "orange" : "red",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (        
          <Tooltip title="View Transaction">
            <EyeOutlined
              size={20}
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => {
                setSelectedTransaction(record);
                setOpenView(true)
                console.log("View transaction details:", record);
              }}
            />
          </Tooltip>                  
      ),
    },
    
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-semibold">Transactions</h1>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
      />
      
       {/* Transaction View Modal */}
      <TransactionViewModal
        open={openView}
        onClose={()=>setOpenView(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transaction;


