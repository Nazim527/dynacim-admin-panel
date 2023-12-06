import React, { useState } from "react";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  getDeleteAuthor,
  getFetchAddAuthors,
  getFetchAuthors,
} from "../../api/getAuthor";
import { SyncLoader } from "react-spinners";
import { Pagination } from "flowbite-react";

const Author = () => {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [degree, setDegree] = useState("");
  const [editingAuthorId, setEditingAuthorId] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authorFetch, setAuthorFetch] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    fetchAuthor();
  }, [name, editingAuthorId, authorFetch, currentPage]);

  const fetchAuthor = async () => {
    try {
      const data = await getFetchAuthors();
      setAuthorFetch(data);
      setLoading(true);
    } catch (error) {
      console.error("API de xeta bas verdi!", error);
    } finally {
      setLoading(false);
    }
  };

  const authors = authorFetch.authors;

  const handleEditClick = (authorId) => {
    setEditingAuthorId(authorId);
    const editingAuthor = authors.find((author) => author.id === authorId);
    setId(editingAuthor.id);
    setName(editingAuthor.name);
    setSurName(editingAuthor.surname);
    setBirthday(editingAuthor.birthday);
    setDegree(editingAuthor.degree);
    setOpenModal(true);
  };

  const handleInfoClick = (author) => {
    setSelectedAuthor(author);
    setInfoModal(true);
  };

  const onCloseInfoModal = () => {
    setInfoModal(false);
  };

  const handleAuthorSubmit = () => {
    if(!name || !surname || !birthday || !degree) {
      toast.error("Please fill in all the empty fields.", {
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
    
    setEditingAuthorId(null);
    onCloseModal();
    getFetchAddAuthors({ editingAuthorId, name, surname, birthday, degree });
    fetchAuthor();
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setId("");
    setName("");
    setSurName("");
    setBirthday("");
    setDegree("");
  };

  // Delete
  const handleDeleteAuthor = (id) => {
    getDeleteAuthor(id);
    fetchAuthor();
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading && !authors && (
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
        <h2 className="page-header">Authors</h2>
        <div>
          <Button
            style={{ backgroundColor: "#4caf50" }}
            onClick={() => setOpenModal(true)}
          >
            Add New Author
          </Button>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {editingAuthorId ? "Edit Author" : "Add a New Author"}
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
                    aria-required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="surname" value="Surname" />
                  </div>
                  <TextInput
                    id="surname"
                    placeholder="Enter the surname"
                    value={surname}
                    onChange={(event) => setSurName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="birthday" value="Birthday" />
                  </div>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#f9fafb",
                      borderRadius: "7px",
                    }}
                    id="birthday"
                    value={birthday}
                    onChange={(event) => setBirthday(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="degree" value="Degree" />
                  </div>
                  <select
                    id="degree"
                    style={{
                      width: "100%",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#f9fafb",
                      borderRadius: "7px",
                    }}
                    value={degree}
                    onChange={(event) => setDegree(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select degree
                    </option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>
                <div className="w-full">
                  <Button onClick={handleAuthorSubmit}>
                    {editingAuthorId ? "Save Changes" : "Add Author"}
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
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>SurName</TableHeadCell>
            <TableHeadCell>Birthday</TableHeadCell>
            <TableHeadCell>Degree</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {authors &&
              authors
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((author, index) => (
                  <TableRow
                    key={author.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1 + (currentPage - 1) * 3}{" "}
                    </TableCell>
                    <TableCell>{author.name}</TableCell>
                    <TableCell>{author.surname}</TableCell>
                    <TableCell>{author.birthday}</TableCell>
                    <TableCell>{author.degree}</TableCell>
                    <TableCell
                      style={{
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "1.2rem",
                        gap: "9px",
                      }}
                    >
                      <FaRegEdit
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleEditClick(author.id)}
                      />
                      <FaInfoCircle
                        className="text-purple-500 hover:underline cursor-pointer"
                        onClick={() => handleInfoClick(author)}
                      />
                      <RiDeleteBin6Line
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteAuthor(author.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {authors && authors.length > 0 && (
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(authors.length / 3)}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* Info Modal */}
      <Modal show={infoModal} size="md" onClose={onCloseInfoModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Author Information
            </h3>
            {selectedAuthor && (
              <div>
                <p>Name: {selectedAuthor.name}</p>
                <p>Surname: {selectedAuthor.surname}</p>
                <p>Birthday: {selectedAuthor.birthday}</p>
                <p>Degree: {selectedAuthor.degree}</p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

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

export default Author;
