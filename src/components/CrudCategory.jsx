import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Spinner,
  Alert
} from "react-bootstrap";
import axios from "axios";

const CrudCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const [current, setCurrent] = useState({ id: null, name: "", image: null });
  const [saving, setSaving] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios.get("https://e-commerce-oagd.onrender.com/categories/")
      .then(res => setCategories(res.data))
      .catch(err => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    axios.get("https://e-commerce-oagd.onrender.com/categories/")
      .then(res => setCategories(res.data))
      .catch(err => setError("Failed to refresh categories"))
      .finally(() => setLoading(false));
  };

  const handleOpen = (cat = { id: null, name: "", image: null }) => {
    setCurrent(cat);
    setModalShow(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData();
    form.append("name", current.name);
    if (current.image instanceof File) form.append("image", current.image);
    try {
      if (current.id) {
        await axios.put(`https://e-commerce-oagd.onrender.com/categories/${current.id}/`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post("https://e-commerce-oagd.onrender.com/categories/", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setModalShow(false);
      refresh();
    } catch {
      setError("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`https://e-commerce-oagd.onrender.com/categories/${id}/`);
      refresh();
    } catch {
      setError("Failed to delete category");
    }
  };

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-5">
      <h2>Manage Categories</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => handleOpen()}>+ Add Category</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                {cat.image_url && <img src={cat.image_url} alt={cat.name} style={{ height: '40px' }} />}
              </td>
              <td>
                <Button size="sm" onClick={() => handleOpen(cat)}>Edit</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(cat.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>{current.id ? "Edit Category" : "Add Category"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={current.name}
                onChange={(e) => setCurrent(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image {current.id && "(upload to replace)"}</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setCurrent(prev => ({ ...prev, image: e.target.files[0] }))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CrudCategory;
