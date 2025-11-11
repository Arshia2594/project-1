

import React, { useState } from "react";

// Components
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import ModalHOC from "../components/hoc/ModalHOC";
import withTable from "../components/hoc/withTable";
import Modal from "../components/ui/Modal";
// Icons
import { User, Mail } from "lucide-react";

// HOC Table
const TableWithFeatures = withTable(Table);

const DemoPage = () => {
  // Form Inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Simple Modal (HOC)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Animated Modal
  const [isAnimatedModalOpen, setIsAnimatedModalOpen] = useState(false);

  // Table Data
  const employees = [
    { id: 1, name: "Smith", email: "smith@gmail.com", role: "Developer" },
    { id: 2, name: "Ella", email: "Ella@test.com", role: "Manager" },
    { id: 3, name: "Sophia", email: "Sophia@test.com", role: "HR" },
  ];

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
  ];

  return (
    <div className="p-6 space-y-10">

      {/* HEADER */}
      <Header
        title="Component Demo Page"
        subtitle=" reusable components"
        align="center"
        variant="h1"
      />

      {/* ADD EMPLOYEE CARD */}
      <Card
        title="Add New User"
        subtitle="All input + button variants"
        shadow="lg"
        rounded="xl"
        className="max-w-xl mx-auto"
      >
        <Input
          label="Full Name"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          leftIcon={User}
          required
        />

        <Input
          label="Email Address"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          leftIcon={Mail}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button variant="primary">Save</Button>

          <Button variant="secondary">Reset</Button>

          <Button variant="outline" onClick={() => setIsAnimatedModalOpen(true)}>
            Open Animated Modal
          </Button>
        </div>
      </Card>

      {/* TABLE SECTION */}
      <Card
        title="User List"
        subtitle="Search + Pagination + Row click modal"
        shadow="md"
        className="mt-8"
      >
        <TableWithFeatures
          data={employees}
          columns={columns}
          onRowClick={(row) => {
            setSelectedRow(row);
            setIsModalOpen(true);
          }}
        />
      </Card>

      {/* SIMPLE MODAL (ROW CLICK) */}
      <ModalHOC
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
      >
        {selectedRow && (
          <div className="space-y-2 text-gray-700">
            <p><strong>ID:</strong> {selectedRow.id}</p>
            <p><strong>Name:</strong> {selectedRow.name}</p>
            <p><strong>Email:</strong> {selectedRow.email}</p>
            <p><strong>Role:</strong> {selectedRow.role}</p>
          </div>
        )}

        <Button
          variant="primary"
          className="w-full mt-4"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </ModalHOC>

      {/* ANIMATED MODAL */}
      <Modal
        open={isAnimatedModalOpen}
        onClose={() => setIsAnimatedModalOpen(false)}
        title="Animated Modal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAnimatedModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => alert("Saved!")}>
              Save
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          This modal uses Framer Motion for smooth animation effects.
        </p>
      </Modal>
    </div>
  );
};

export default DemoPage;
