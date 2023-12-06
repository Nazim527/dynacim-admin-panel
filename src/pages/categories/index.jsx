import React, { useState } from "react";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  getDeleteCategory,
  getFetchAddCategories,
  getFetchCategories,
} from "../../api/getCategories";
import { SyncLoader } from "react-spinners";
import { Pagination } from "flowbite-react";

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoriesFetch, setCategoriesFetch] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    fetchCategories();
  }, [name, editingCategoryId, categoriesFetch, currentPage]);

  const fetchCategories = async () => {
    try {
      const data = await getFetchCategories();
      setCategoriesFetch(data);
      setLoading(true);
    } catch (error) {
      console.error("API de xeta bas verdi!", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = categoriesFetch.categories;

  const handleEditClick = (categoryId) => {
    setEditingCategoryId(categoryId);
    const editingCategory = categories.find(
      (category) => category.id === categoryId
    );
    setName(editingCategory.name);
    setOpenModal(true);
  };

  const handleNameSubmit = () => {
    if (!name) {
      toast.error("Please enter a category name!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setEditingCategoryId(null);
    onCloseModal();
    getFetchAddCategories({ name, editingCategoryId });
    fetchCategories();
    toast.success("Category submitted successfully!");
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setName("");
  };

  const handleDeleteCategory = (id) => {
    getDeleteCategory(id);
    fetchCategories();
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading && !categories && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <SyncLoader
              color="#464bc1"
              margin={10}
              size={23}
              speedMultiplier={1}
            />
          </div>
        </div>
      )}
      <div className="top">
        <h2 className="page-header">Categories</h2>
        <div>
          <Button
            style={{ backgroundColor: "#4caf50" }}
            onClick={() => setOpenModal(true)}
          >
            Add New Category
          </Button>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {editingCategoryId ? "Edit Category" : "Add a New Category"}
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    placeholder="Enter the name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="w-full">
                  <Button onClick={handleNameSubmit}>
                    {editingCategoryId ? "Save Changes" : "Add Category"}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div className="overflow-x-auto bottom">
        <Table style={{marginBottom: "20px"}}>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {categories &&
              categories
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((category, index) => (
                  <TableRow
                    key={category.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1 + (currentPage - 1) * 3}
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell
                      style={{
                        width: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "1.2rem",
                        gap: "9px",
                      }}
                    >
                      <FaRegEdit
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleEditClick(category.id)}
                      />
                      <RiDeleteBin6Line
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteCategory(category.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {categories && categories.length > 0 && (
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(categories.length / 3)}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Categories;
