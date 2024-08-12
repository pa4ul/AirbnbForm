import React, { useState, useEffect } from "react";
import api from "../api";
import {
  Table,
  Card,
  Button,
  Modal,
  Descriptions,
  notification,
  message,
} from "antd";

const GuestSheetTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    api
      .get("/api/guestsheet/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to load guestsheets");
        setLoading(false);
      });
  }, []);

  const handleRowClick = (record) => {
    setSelectedGuest(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGuest(null);
  };

  const handleDelete = (id) => {
    console.log(id);
    api
      .delete(`/api/guestsheet/${id}/`)
      .then((response) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        notification.success({
          message: "Delete Successful",
          description: "The record has been successfully deleted.",
        });
        handleCloseModal(); // Close modal after successful delete
      })
      .catch((error) => {
        console.error("Error deleting guestsheet:", error);
        notification.error({
          message: "Delete Failed",
          description: "There was an error deleting the record.",
        });
      });
  };

  // Spaltenkonfiguration für die Tabelle
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleRowClick(record)}>View Details</Button>
      ),
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <Card title="Guestsheet Overview" bordered={false}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title="Guest Details"
          open={modalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button
              key="delete"
              type="danger"
              onClick={() => handleDelete(selectedGuest.id)}
            >
              Delete
            </Button>,
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
          ]}
          width={800}
        >
          {selectedGuest && (
            <Descriptions title="Guest Information" bordered column={1}>
              <Descriptions.Item key="first_name" label="First Name">
                {selectedGuest.first_name}
              </Descriptions.Item>
              <Descriptions.Item key="last_name" label="Last Name">
                {selectedGuest.last_name}
              </Descriptions.Item>
              <Descriptions.Item key="date_of_birth" label="Date of Birth">
                {selectedGuest.date_of_birth
                  ? new Date(selectedGuest.date_of_birth).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item key="nationality" label="Nationality">
                {selectedGuest.nationality}
              </Descriptions.Item>
              <Descriptions.Item key="travel_document" label="Travel Document">
                {selectedGuest.travel_document}
              </Descriptions.Item>
              <Descriptions.Item key="document_number" label="Document Number">
                {selectedGuest.document_number}
              </Descriptions.Item>
              <Descriptions.Item key="date_of_issue" label="Date of Issue">
                {selectedGuest.date_of_issue
                  ? new Date(selectedGuest.date_of_issue).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item
                key="issuing_authority"
                label="Issuing Authority"
              >
                {selectedGuest.issuing_authority}
              </Descriptions.Item>
              <Descriptions.Item key="issuing_country" label="Issuing Country">
                {selectedGuest.issuing_country}
              </Descriptions.Item>
              <Descriptions.Item key="domicile_place" label="Domicile Place">
                {selectedGuest.domicile_place}
              </Descriptions.Item>
              <Descriptions.Item
                key="domicile_zip_code"
                label="Domicile Zip Code"
              >
                {selectedGuest.domicile_zip_code}
              </Descriptions.Item>
              <Descriptions.Item key="domicile_street" label="Domicile Street">
                {selectedGuest.domicile_street}
              </Descriptions.Item>
              <Descriptions.Item
                key="domicile_country"
                label="Domicile Country"
              >
                {selectedGuest.domicile_country}
              </Descriptions.Item>
              <Descriptions.Item
                key="traveling_with_surname"
                label="Traveling With Surname"
              >
                {selectedGuest.traveling_with_surname || "-"}
              </Descriptions.Item>
              <Descriptions.Item
                key="traveling_with_first_name"
                label="Traveling With First Name"
              >
                {selectedGuest.traveling_with_first_name || "-"}
              </Descriptions.Item>
              <Descriptions.Item
                key="traveling_with_date_of_birth"
                label="Traveling With Date of Birth"
              >
                {selectedGuest.traveling_with_date_of_birth
                  ? new Date(
                      selectedGuest.traveling_with_date_of_birth
                    ).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item key="total_guests" label="Total Guests">
                {selectedGuest.total_guests}
              </Descriptions.Item>
              <Descriptions.Item key="date_of_arrival" label="Date of Arrival">
                {selectedGuest.date_of_arrival
                  ? new Date(selectedGuest.date_of_arrival).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item
                key="date_of_departure"
                label="Date of Departure"
              >
                {selectedGuest.date_of_departure
                  ? new Date(
                      selectedGuest.date_of_departure
                    ).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item
                key="actual_departure"
                label="Actual Departure"
              >
                {selectedGuest.actual_departure
                  ? new Date(
                      selectedGuest.actual_departure
                    ).toLocaleDateString()
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item key="created_at" label="Created At">
                {selectedGuest.created_at
                  ? new Date(selectedGuest.created_at).toLocaleString()
                  : "-"}
              </Descriptions.Item>
              {selectedGuest.signature && (
                <Descriptions.Item key="signature" label="Signature">
                  <img
                    src={selectedGuest.signature}
                    alt="Signature"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default GuestSheetTable;
