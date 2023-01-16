import React, { useEffect, useState } from "react";
import Category from "./Category";
import Spinner from "./Spinner";
import { Layout } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const { Header, Content, Footer } = Layout;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        setShowSpinner(false);
      })
      .catch((err) => console.log("unable to get categories", err));
  }, []);

  return (
    <Layout>
      <Header>
        <span
          style={{ color: "whitesmoke", fontSize: "25px", fontWeight: "bold" }}
        >
          Convin
        </span>
      </Header>
      <Content style={{ backgroundColor: "#1677ff", minHeight: "87vh", maxHeight: "87vh", overflowY: 'auto' }}>
        {showSpinner ? (
          <Spinner fullHeight />
        ) : (
          <DragDropContext>
            <Droppable droppableId={"same"}>
              {(provided) => (
                <ul
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: "15px",
                    minHeight: "280px",
                    padding: "24px 0px",
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {categories.map((category) => (
                    <Category
                      key={category.id}
                      name={category.name}
                      id={category.id}
                    />
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        ©2023 Created by Indra Kishore Kumar
      </Footer>
    </Layout>
  );
};

export default Home;