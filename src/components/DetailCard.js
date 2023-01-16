import React, { useState } from "react";
import { Modal, Card } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import AddForm from "./AddForm";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const DetailCard = (props) => {
  const { video, deleteCard, setAlert } = props;
  const [cardData, setCardData] = useState(video);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete this Card?",
      icon: <ExclamationCircleFilled />,
      content: `${cardData.name}`,
      onOk() {
        deleteCard(cardData);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const cardActions = [
    <EditTwoTone onClick={() => setIsFormModalOpen(true)} />,
    <DeleteTwoTone onClick={() => showConfirm()} />,
  ];

  const onEditCard = (values) => {
    fetch(`http://localhost:3000/videos/${cardData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.title,
        description: values.description,
        videoUrl: values.videoUrl,
        categoryId: values.id,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          setIsFormModalOpen(false);

          setAlert({
            visible: true,
            message: `${values.title} Edited Successfully!`,
            type: "success",
          });
          const result = await res.json();
          setCardData(result);
        }
        setTimeout(() => {
          setAlert({
            visible: false,
          });
        }, 7000);
      })
      .catch((err) => console.log("form submission failed", err));
  };

  return (
    <>
      <Card actions={cardActions} hoverable size="small">
        <div onClick={() => setIsModalOpen(true)}>
          <h3>{cardData.name}</h3>
          <p>
            {cardData.description
              ? cardData.description
              : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus soluta libero ex nam rem deleniti eum laudantium
            aperiam at tempore!`}
          </p>
        </div>
      </Card>
      <Modal
        title={cardData.name}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="1000px"
        footer=""
      >
        <iframe
          height="500px"
          width="950px"
          src={cardData.videoUrl}
          title={cardData.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Modal>
      <Modal
        title={`Edit ${cardData.name} card`}
        open={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        width="400px"
        footer=""
      >
        <AddForm
          formData={{
            title: cardData.name,
            description: cardData.description,
            videoUrl: cardData.videoUrl,
          }}
          onFormSubmit={onEditCard}
        />
      </Modal>
    </>
  );
};

export default DetailCard;
