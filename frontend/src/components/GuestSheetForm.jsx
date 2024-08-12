// src/components/GuestsheetForm.jsx
import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Card,
  message,
} from "antd";
import moment from "moment";
import "../styles/GuestSheetForm.css";
import api from "../api";
import SignaturePad from "./SignaturePad";

const GuestsheetForm = () => {
  const [form] = Form.useForm(); //Instanz des Ant Design Forms
  const [signature, setSignature] = useState("");

  const onFinish = (values) => {
    // Wird aufgerufen, wenn das Formular abgeschickt wird
    // Format the dates to match the Django model format
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth
        ? values.date_of_birth.format("YYYY-MM-DD")
        : null,
      date_of_issue: values.date_of_issue
        ? values.date_of_issue.format("YYYY-MM-DD")
        : null,
      date_of_arrival: values.date_of_arrival
        ? values.date_of_arrival.format("YYYY-MM-DD")
        : null,
      date_of_departure: values.date_of_departure
        ? values.date_of_departure.format("YYYY-MM-DD")
        : null,
      actual_departure: values.actual_departure
        ? values.actual_departure.format("YYYY-MM-DD")
        : null,
      traveling_with_date_of_birth: values.traveling_with_date_of_birth
        ? values.traveling_with_date_of_birth.format("YYYY-MM-DD")
        : null,
      signature,
    };

    api
      .post("/api/guestsheet/", formattedValues)
      .then((response) => {
        console.log("Success:", response.data);
        message.success("Entry created!");

        form.resetFields(); // Reset form after submission
        setSignature("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSave = (dataURL) => {
    // Verarbeite die Data-URL der Unterschrift hier
    setSignature(dataURL);
    console.log("Unterschrift gespeichert:", dataURL);

    // Optional: Sende die Data-URL an den Server oder speichere sie lokal
    // fetch('/api/save-signature', { method: 'POST', body: JSON.stringify({ signature: dataURL }) })
  };

  return (
    <div className="form-wrapper">
      <Card title="Guest Information" style={{ width: 800 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            date_of_birth: moment(),
            date_of_issue: moment(),
            date_of_arrival: moment(),
            date_of_departure: moment(),
            actual_departure: moment(),
            traveling_with_date_of_birth: moment(),
          }}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="date_of_birth" label="Date of Birth">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="nationality"
            label="Nationality"
            rules={[
              { required: true, message: "Please input your nationality!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Travel Document Information */}
          <Form.Item name="travel_document" label="Travel Document">
            <Input />
          </Form.Item>
          <Form.Item name="document_number" label="Document Number">
            <Input />
          </Form.Item>
          <Form.Item name="date_of_issue" label="Date of Issue">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="issuing_authority" label="Issuing Authority">
            <Input />
          </Form.Item>
          <Form.Item name="issuing_country" label="Issuing Country">
            <Input />
          </Form.Item>

          {/* Main Domicile Information */}
          <Form.Item name="domicile_place" label="Domicile Place">
            <Input />
          </Form.Item>
          <Form.Item name="domicile_zip_code" label="Domicile Zip Code">
            <Input />
          </Form.Item>
          <Form.Item name="domicile_street" label="Domicile Street">
            <Input />
          </Form.Item>
          <Form.Item name="domicile_country" label="Domicile Country">
            <Input />
          </Form.Item>

          {/* Traveling With */}
          <Form.Item
            name="traveling_with_surname"
            label="Traveling With Surname"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="traveling_with_first_name"
            label="Traveling With First Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="traveling_with_date_of_birth"
            label="Traveling With Date of Birth"
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          {/* Guest Stay Information */}
          <Form.Item
            name="total_guests"
            label="Total Guests"
            rules={[
              {
                required: true,
                message: "Please input the total number of guests!",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="date_of_arrival" label="Date of Arrival">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="date_of_departure" label="Date of Departure">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="actual_departure" label="Actual Departure">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Signature">
            <SignaturePad onSave={handleSave} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GuestsheetForm;
