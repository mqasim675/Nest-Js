"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HamburgerNavbar from "../../molecules/navbar/HamburgerNavbar";
import NewRecordForm from "../pop-up";
function PostList() {
  const [posts, setPosts] = useState(() => {
   
    const localData = localStorage.getItem("posts");
    const parsedData = localData ? JSON.parse(localData) : [];
    return parsedData;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleSaveNewRecord = (newRecordData) => {
    console.log("newRecordData::::", newRecordData)
    const newRecord = {
      id: posts.length + 1,
      userId: newRecordData.userId,
      title: newRecordData.title,
      body: newRecordData.body,
    };

    const updatedPosts = [...posts, newRecord];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setIsFormOpen(false);
  };
  const handleDelete = (record) => {
    const updatedPosts = posts.filter((item) => item.id !== record.id);

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

  };
  const handleEdit = (record) => {
    setRecordToEdit(record);
    setIsFormOpen(true);
  };
  const handleUpdate = (updatedData, record) => {
    const index = posts.findIndex((item) => item.id === record.id);

    if (index !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[index] = {
        ...record,
        userId: updatedData.userId,
        title: updatedData.title,
        body: updatedData.body,
      };

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

    }
  };
  return (
    <div>
      <HamburgerNavbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        posts={posts}
      />
      <div className="p-4 bg-gray-400 border ">
        <button onClick={() => setIsFormOpen(true)} className="bg-gray-700 p-3">Create New Record</button>
        {isFormOpen && (
          <div className="popup-overlay">
            <NewRecordForm
              onSave={(data, record) => {
                if (record) {
                  handleUpdate(data, record);
                } else {
                  handleSaveNewRecord(data);
                }
              }}
              onClose={() => {
                setIsFormOpen(false);
                setRecordToEdit(null);
              }}
              recordToEdit={recordToEdit}
            />
          </div>
        )}
      </div>
      <ul>
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          >
            <div className="text-lg font-semibold mb-2">{post.id}</div>
            <div className="text-gray-600 mb-1">User ID: {post.userId}</div>
            <div className="text-lg font-semibold mb-2">{post.title}</div>
            <div className="text-gray-800">{post.body}</div>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post)}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
