import React, { useState, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import { TestContext } from "./state/context";
import LoginPage from "./components/LoginPage.jsx";
import { columns, columnsReducer } from "./state/reducers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const onDragEnd = (result, jobColumn, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = jobColumn[source.droppableId];
    const destColumn = jobColumn[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...jobColumn,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = jobColumn[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...jobColumn,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
export default function App() {
  const [prevJobColumn, prevJobDispatch] = useReducer(columnsReducer, columns);
  const [jobColumn, setColumns] = useState(prevJobColumn);

  return (
    <TestContext.Provider>
      <Router>
        <div>
          <li>
            <Link to="/loginpage">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/loginpage" />
          </Route>
          <Route path="/loginpage">
            <LoginPage />
          </Route>
          <Route path="/board">
            <div>
              <Header />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <DragDropContext
                  onDragEnd={(result) =>
                    onDragEnd(result, jobColumn, setColumns)
                  }
                >
                  {Object.entries(jobColumn).map(([id, column]) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h2 style={{ color: "white" }}>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                          <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    background: snapshot.isDraggingOver
                                      ? "lightblue"
                                      : "lightgrey",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500,
                                  }}
                                >
                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item.company}
                                        draggableId={item.company}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          if (column.name === "Applied") {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  userSelect: "none",
                                                  padding: 16,
                                                  margin: "0 0 8px 0",
                                                  minHeight: "50px",
                                                  backgroundColor: snapshot.isDragging
                                                    ? "#263B4A"
                                                    : "#456C86",
                                                  color: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                {item.company}
                                              </div>
                                            );
                                          } else if (
                                            column.name === "In Progress"
                                          ) {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  userSelect: "none",
                                                  padding: 16,
                                                  margin: "0 0 8px 0",
                                                  minHeight: "50px",
                                                  backgroundColor: snapshot.isDragging
                                                    ? "#d98124"
                                                    : "orange",
                                                  color: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                {item.company}
                                              </div>
                                            );
                                          } else if (
                                            column.name === "Completed"
                                          ) {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  userSelect: "none",
                                                  padding: 16,
                                                  margin: "0 0 8px 0",
                                                  minHeight: "50px",
                                                  backgroundColor: snapshot.isDragging
                                                    ? "#164d08"
                                                    : "green",
                                                  color: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                {item.company}
                                              </div>
                                            );
                                          } else if (column.name === "Saved") {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  userSelect: "none",
                                                  padding: 16,
                                                  margin: "0 0 8px 0",
                                                  minHeight: "50px",
                                                  backgroundColor: snapshot.isDragging
                                                    ? "#a61e00"
                                                    : "#ff2f00",
                                                  color: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                {item.company}
                                              </div>
                                            );
                                          }
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                    );
                  })}
                </DragDropContext>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </TestContext.Provider>
  );
}

/*
                    <Applied />
                    <InProgress />
                    <Completed />
                    <Saved />

                              <button
                                onClick={() => {
                                  console.log(column.items);
                                }}
                              ></button>
*/
