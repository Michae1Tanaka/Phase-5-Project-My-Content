import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { useMatch } from "react-router-dom";
import Content from "./Content";

function ContentContainer() {
  const { content, setContent } = useContext(UserContext);
  const isVideo = useMatch("/videos");
  const endpoint = isVideo ? "/videos" : "/articles";
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editContentData, setEditContentData] = useState({
    title: "",
    description: "",
    _thumbnail: "",
    url: "",
    _creator: "",
    created_at: null,
    type: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(endpoint);
        const contentData = await res.json();
        setContent(contentData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, [endpoint]);

  const handleDelete = async (event, contentID) => {
    event.preventDefault();

    try {
      const res = await fetch(`${endpoint}/${contentID}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const newContent = content.filter((item) => item.id !== contentID);
        setContent(newContent);
      } else {
        console.error("Failed to delete content");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const res = await fetch(`${endpoint}/${editContentData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        let updatedContents = [...content];

        const index = updatedContents.findIndex((item) => item.id === editContentData.id);

        if (index !== -1) {
          if (values.type !== updatedContents[index].type) {
            updatedContents.splice(index, 1);
          } else {
            updatedContents[index] = { ...updatedContents[index], ...values };
          }
        }

        setContent(updatedContents);
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to edit content: ", error);
    }
  };

  return (
    <Content
      content={content}
      isEditDialogOpen={isEditDialogOpen}
      editContentData={editContentData}
      handleDelete={handleDelete}
      handleEditSubmit={handleEditSubmit}
      setEditDialogOpen={setEditDialogOpen}
      setEditContentData={setEditContentData}
    />
  );
}

export default ContentContainer;
