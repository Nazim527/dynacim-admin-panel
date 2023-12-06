import React, { useState, useEffect } from "react";
import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./style.scss";

//? Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { getFetchCategories } from "../../api/getCategories";
import { getFetchAuthors } from "../../api/getAuthor";
import {
  getDeleteNews,
  getFetchAddNews,
  getFetchNews,
} from "../../api/getnews";
import { SyncLoader } from "react-spinners";

const NewsList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [listNewsFetch, setListNewsFetch] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleInfoClick = (newsId) => {
    const selectedNewsItem = newsList.find((news) => news.id === newsId);
    setSelectedNews(selectedNewsItem);
    setInfoModal(true);
  };

  const onCloseInfoModal = () => {
    setInfoModal(false);
  };

  const [AllCategoriesFetch, setAllCategoriesFetch] = useState({
    categories: [],
  });
  const [AllAuthorsFetch, setAllAuthorsFetch] = useState({ authors: [] });

  //! Selected Auth and Category
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const dataCategories = await getFetchCategories();
      const dataAuthors = await getFetchAuthors();
      const newsData = await getFetchNews();

      const updatedNewsList = newsData.allNews.map((news) => {
        const author = dataAuthors.authors.find((a) => a.id === news.author_id);
        const category = dataCategories.categories.find(
          (c) => c.id === news.category_id
        );

        return {
          ...news,
          author_name: author ? author.name : "",
          category_name: category ? category.name : "",
        };
      });

      setListNewsFetch(updatedNewsList);
      setAllCategoriesFetch({
        categories: Array.isArray(dataCategories.categories)
          ? dataCategories.categories
          : [],
      });
      setAllAuthorsFetch({
        authors: Array.isArray(dataAuthors.authors) ? dataAuthors.authors : [],
      });
      setLoading(true);
    } catch (error) {
      console.error("API de xeta bas verdi!", error);
    } finally {
      setLoading(false);
    }
  };

  const newsList = listNewsFetch;

  const handleEditClick = (newsId) => {
    setEditingNewsId(newsId);
    const editingNews = newsList.find((news) => news.id === newsId);
    setTitle(editingNews.title);
    setDescription(editingNews.description);
    setAuthor(
      editingNews.author && editingNews.author.id !== undefined
        ? editingNews.author.id
        : ""
    );
    setCategory(
      editingNews.category && editingNews.category.id !== undefined
        ? editingNews.category.id
        : ""
    );
    setCoverImage(editingNews.coverImage);
    setOpenModal(true);

    fetchAll();
  };

  const [imageFile, setImageFile] = useState(null);

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const handleNewsSubmit = () => {
    if (editingNewsId !== null) {
      setListNewsFetch((prevNewsList) =>
        prevNewsList.map((news) =>
          news.id === editingNewsId
            ? {
                ...news,
                title,
                description,
                author_name:
                  AllAuthorsFetch.authors.find((a) => a.id === Number(author))
                    ?.name || "",
                category_name:
                  AllCategoriesFetch.categories.find(
                    (c) => c.id === Number(category)
                  )?.name || "",
                coverImage,
              }
            : news
        )
      );
    } else {
      setListNewsFetch((prevNewsList) => [
        ...prevNewsList,
        {
          id: prevNewsList.length + 1,
          title,
          description,
          author_name:
            AllAuthorsFetch.authors.find((a) => a.id === Number(author))
              ?.name || "",
          category_name:
            AllCategoriesFetch.categories.find((c) => c.id === Number(category))
              ?.name || "",
          coverImage,
        },
      ]);
    }

    getFetchAddNews({
      title,
      description,
      formattedCurrentDate,
      author,
      category,
      coverImage,
      editingNewsId,
    });
    setEditingNewsId(null);
    onCloseModal();
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setTitle("");
    setDescription("");
    setAuthor("");
    setCategory("");
    setCoverImage("");
  };

  //? Title and description short
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  const handleDeleteNews = async (id) => {
    await getDeleteNews(id);
    fetchAll();
  };

  return (
    <div>
      {loading && listNewsFetch.length === 0 && (
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
        <h2 className="page-header">News List</h2>
        <div>
          <Button
            style={{ backgroundColor: "#4caf50" }}
            onClick={() => setOpenModal(true)}
          >
            Add New News
          </Button>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {editingNewsId ? "Edit News" : "Add a New News"}
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="title" value="Title" />
                  </div>
                  <TextInput
                    id="title"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                  </div>
                  <textarea
                    id="description"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    rows={4}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="author" value="Author" />
                  </div>
                  <Select
                    id="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Author
                    </option>
                    {AllAuthorsFetch.authors &&
                      AllAuthorsFetch.authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="category" value="Category" />
                  </div>
                  <Select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {AllCategoriesFetch.categories &&
                      AllCategoriesFetch.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="coverImage" value="Cover Image" />
                  </div>
                  <input
                    type="file"
                    id="coverImage"
                    onChange={(event) => setImageFile(event.target.files[0])}
                    accept="image/*"
                  />
                </div>
                <div className="w-full">
                  <Button onClick={handleNewsSubmit}>
                    {editingNewsId ? "Save Changes" : "Add News"}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div className="overflow-x-auto bottom">
        <Table>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Cover Image</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {newsList &&
              newsList.map((news, index) => (
                <TableRow
                  key={news.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </TableCell>
                  <TableCell>{truncateText(news.title, 15)}</TableCell>
                  <TableCell>{truncateText(news.description, 15)}</TableCell>
                  <TableCell>{news.author_name}</TableCell>
                  <TableCell>{news.category_name}</TableCell>
                  <TableCell>
                    {news.created_at &&
                      new Date(news.created_at).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell>
                    {news.cover && (
                      <img
                        src={news.cover}
                        alt={`Cover for ${news.title}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "1.2rem",
                      gap: "9px",
                      height: "90px",
                    }}
                  >
                    <FaRegEdit
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handleEditClick(news.id)}
                    />
                    <FaInfoCircle
                      className="text-purple-500 hover:underline cursor-pointer"
                      onClick={() => handleInfoClick(news.id)}
                    />
                    <RiDeleteBin6Line
                      className="text-red-500 hover:underline cursor-pointer"
                      onClick={() => handleDeleteNews(news.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {selectedNews && (
        <Modal show={infoModal} size="md" onClose={onCloseInfoModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                News Details
              </h3>
              <div className="image">
                <img src={selectedNews.cover} alt="" />
              </div>
              <p>Title: {selectedNews.title}</p>
              <p>Description: {selectedNews.description}</p>
              <p>Author: {selectedNews.author_name}</p>
              <p>Category: {selectedNews.category_name}</p>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default NewsList;
