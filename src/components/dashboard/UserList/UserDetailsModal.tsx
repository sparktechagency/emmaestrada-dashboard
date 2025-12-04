import { Col, Divider, Modal, Row } from "antd";
import dayjs from "dayjs";

const UserDetailsModal = ({ open, data, onClose }:any) => {

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <p className="text-xl font-semibold text-primary text-center">
          User Details
        </p>
      }
      centered
      width={700}
    >
      <Divider style={{ background: "gray" }} />
      <Row gutter={[12, 24]}>
        {/* Name */}
        <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">Name</p>
          <p className="text-[15px] font-medium">{data?.name}</p>
        </Col>

        {/* Status */}
        <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">Status</p>
          <span
            className={`font-semibold text-[15px] ${
              data?.status?.toLowerCase() === "active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {data?.status}
          </span>
        </Col>

        {/* Email */}
        <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">Email</p>
          <p className="text-[15px] font-medium">{data?.email}</p>
        </Col>
        

        {/* Role */}
        <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">Role</p>
          <p className="text-[15px] font-medium">{data?.role}</p>
        </Col>

        {/* Join Date */}
        <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">
            Join Date
          </p>
          <p className="text-[15px] font-medium">
            {dayjs(data?.joinDate).format("DD MMMM, YYYY")}
          </p>
        </Col>
        {/* Join Date */}
        {data?.role?.toLowerCase() == 'artist' && <Col span={12}>
          <p className="text-[#808080] text-[15px] font-medium mb-1">
            Followers
          </p>
          <p className="text-[15px] text-blue-800 font-bold">
            {data?.followers}
          </p>
        </Col>}
        
      </Row>
    </Modal>
  );
};

export default UserDetailsModal;
