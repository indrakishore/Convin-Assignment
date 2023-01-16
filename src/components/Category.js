import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Modal } from "antd";
import DetailCard from "./DetailCard";
import Spinner from "./Spinner";
import { PlusOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import AddForm from "./AddForm";

const Category = ({ name, id }) => {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [alert, setAlert] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}/videos`)
      .then((res) => res.json())
      .then((json) => {
        setCards(json);
        setTimeout(() => {
          setShowSpinner(false);
        }, 2000);
      });
  }, [id, setCards]);


  const deleteCard = (video) => {
    fetch(`http://localhost:3000/videos/${video.id}`, { method: "DELETE" })
      .then(() => {
        setAlert({
          visible: true,
          type: "success",
          message: `${video.name} deleted successfully!`,
        });
        const newCards = cards.filter((card) => card.id !== video.id);
        setCards(newCards);
        setTimeout(() => {
          setAlert({
            visible: false,
          });
        }, 7000);
      })
      .catch((err) => console.log("failure in deleting video card", err));
  };


  const onCreateCard = (values) => {
    fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.title,
        description: values.description,
        videoUrl: values.videoUrl,
        categoryId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setIsModalOpen(false);
          setAlert({
            visible: true,
            message: `${values.title} card added Successfully!`,
            type: "success",
          });
        }
        return res.json();
      })
      .then((result) => {
        const updatedCards = [...cards, result];
        setCards(updatedCards);
      })
      .catch((err) => console.log("form submission failed", err));
  };

  return (
    <Card
      title={name}
      style={{ width: 400 }}
      hoverable
      actions={[
        <>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            <PlusOutlined /> Add new card
          </Button>
        </>,
      ]}
    >
      {showSpinner ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {alert.visible && (
            <Alert type={alert.type} message={alert.message} closable />
          )}

          {cards.map((video, index) => {
            return (
              <Draggable
                key={video.id.toString()}
                draggableId={video.id.toString()}
                index={index}
              >
                {(dragProvided) => (
                  <li
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <DetailCard video={video} deleteCard={deleteCard} setAlert={setAlert} />
                  </li>
                )}
              </Draggable>
            );
          })}
        </div>
      )}
      <Modal
        title={`Add new card in ${name} category`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="400px"
        cancelText="Close"
      >
        <AddForm
          formData={{}}
          onFormSubmit={onCreateCard}
        />
      </Modal>
    </Card>
  );
};

export default Category;