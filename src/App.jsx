import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Triangle from "./components/Triangle/Triangle";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import Rank from "./components/Rank/Rank";
import "./App.css";

const initialState = {
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    triangles: 0,
    joined: "",
  },
};

const App = () => {
  const [vertex1, setVertex1] = useState({ x: 50, y: 250 });
  const [vertex2, setVertex2] = useState({ x: 250, y: 250 });
  const [vertex3, setVertex3] = useState({ x: 150, y: 50 });
  const [triangles, setTriangles] = useState([]);
  const [state, setState] = useState(initialState);

  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        triangles: data.triangles,
        joined: data.joined,
      },
    }));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState((prevState) => ({ ...prevState, isSignedIn: true }));
    }
    setState((prevState) => ({ ...prevState, route }));
  };

  // Adds a new triangle to Triangle List
  const addTriangle = () => {
    const newTriangle = {
      id: Date.now(),
      //userId: state.user.id,
      vertex1,
      vertex2,
      vertex3,
    };
    setTriangles([...triangles, newTriangle]);
  };

  // This updates the triangles count in db
  const updateTriangleEntries = () => {
    fetch("https://react-trokut-server.onrender.com/triangle", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        setState((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            triangles: count,
          },
        }));
      })
      .catch((error) => {
        console.error("Error updating triangle entries:", error);
      });
  };

  //Add triangle handler function that triggers on Add Triangle button click
  const onAddTriangleHandler = () => {
    addTriangle();
    updateTriangleEntries();
  };

  //Deletes Triangles from Triangle List
  const deleteTriangle = (triangleId) => {
    const updatedTriangles = triangles.filter(
      (triangle) => triangle.id !== triangleId
    );
    setTriangles(updatedTriangles);
  };

  //Edits a triangle
  const editTriangle = (triangleId, editedVertices) => {
    const updatedTriangles = triangles.map((triangle) => {
      if (triangle.id === triangleId) {
        return { ...triangle, ...editedVertices };
      }
      return triangle;
    });
    setTriangles(updatedTriangles);
  };

  const { isSignedIn, route } = state;
  return (
    <div>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Rank name={state.user.name} triangles={state.user.triangles} />
          <h2>Trokut App</h2>
          <div>
            <h2>Dodaj trokut u listu:</h2>
            <div>
              <label>Točka 1:</label>
              <input
                type="number"
                value={vertex1.x}
                onChange={(e) =>
                  setVertex1({ x: parseInt(e.target.value), y: vertex1.y })
                }
              />
              <input
                type="number"
                value={vertex1.y}
                onChange={(e) =>
                  setVertex1({ x: vertex1.x, y: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label>Točka 2:</label>
              <input
                type="number"
                value={vertex2.x}
                onChange={(e) =>
                  setVertex2({ x: parseInt(e.target.value), y: vertex2.y })
                }
              />
              <input
                type="number"
                value={vertex2.y}
                onChange={(e) =>
                  setVertex2({ x: vertex2.x, y: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label>Točka 3:</label>
              <input
                type="number"
                value={vertex3.x}
                onChange={(e) =>
                  setVertex3({ x: parseInt(e.target.value), y: vertex3.y })
                }
              />
              <input
                type="number"
                value={vertex3.y}
                onChange={(e) =>
                  setVertex3({ x: vertex3.x, y: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="canvas-area">
              <svg width="350" height="350">
                <polygon
                  points={`${vertex1.x},${vertex1.y} ${vertex2.x},${vertex2.y} ${vertex3.x},${vertex3.y}`}
                  fill="lightblue"
                  stroke="black"
                />
              </svg>
            </div>
            <button onClick={onAddTriangleHandler}>Dodaj trokut</button>
          </div>
          <h2>Lista Trokuta:</h2>
          <div className="triangle-list">
            {triangles.length > 0 ? (
              triangles.map((triangle) => (
                <Triangle
                  key={triangle.id}
                  triangle={triangle}
                  onDelete={deleteTriangle}
                  onEdit={editTriangle}
                />
              ))
            ) : (
              <img src="./public/sad-triangle.jpg" />
            )}
          </div>
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;

/*---------------------------------------------------------------------------
S OVIM SAM USPIO POSLAT DATA U POSTGRESQL TABLE, 
ALI MI JAVLJA Uncaught TypeError: point1 is undefined error u Triangle.jsx 
A NISAM USPIO SKROZ POPRAVITI
 
const addTriangle = () => {
  // Create a new triangle object with the vertex data
  const newTriangle = {
    id: Date.now(),
    userId: state.user.id,
    vertex1,
    vertex2,
    vertex3,
  };
  return newTriangle;
};

const updateTriangleInDb = (newTriangle) => {
  // Send a POST request to the server's /triangle endpoint
  fetch("https://react-trokut-server.onrender.com/triangle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTriangle),
  })
    .then((response) => response.json())
    .then((triangle) => {
      // Update the state with the new triangle
      setTriangles([...triangles, triangle]);
    })
    .catch((error) => {
      console.error("Error adding triangle:", error);
    });
};

//Add triangle handler function that triggers on Add Triangle button click
const onAddTriangleHandler = (newTriangle) => {
  updateTriangleInDb(addTriangle(newTriangle));
}; 
-----------------------------------------------------------------------------------
*/

/* 
------------OVAKO NEKAKO BIH PROBAO DOHVATITI SA SERVERA TROKUTE OD ULOGIRANOG USERA------------------   
  useEffect(() => {
    if (state.isSignedIn) {
      // Fetch user's triangles when user is signed in
      fetchUserTriangles(state.user.id);
    }
  }, [state.isSignedIn]);

  const fetchUserTriangles = (userId) => {
    // Fetch the user's triangles from the server
    fetch(`https://react-trokut-server.onrender.com/user/${userId}/triangles`)
      .then((response) => {
        console.log("Raw response:", response);
        return response.json();
      })
      .then((trianglesData) => {
        setTriangles(trianglesData);
      })
      .catch((error) => {
        console.error("Error fetching user triangles:", error);
      });
  }; 
-------------------------------------------------------------------------------------  
*/
