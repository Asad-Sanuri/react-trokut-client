import React, { useState } from "react";
import generatePDF from "../GeneratePDF/generatePDF";
import "./Triangle.css";

const Triangle = ({ triangle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVertices, setEditedVertices] = useState(triangle);

  // A few functions about editing a triangle
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedVertices(triangle);
    }
  };

  const handleEditChange = (e, vertex) => {
    const { name, value } = e.target;
    setEditedVertices((prevVertices) => ({
      ...prevVertices,
      [vertex]: {
        ...prevVertices[vertex],
        [name]: parseInt(value),
      },
    }));
  };

  const saveEditedTriangle = () => {
    onEdit(triangle.id, editedVertices);
    toggleEdit();
  };

  // Several functions that calculate the triangle's properties
  const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateTriangleArea = (vertex1, vertex2, vertex3) => {
    const area =
      0.5 *
      Math.abs(
        vertex1.x * (vertex2.y - vertex3.y) +
          vertex2.x * (vertex3.y - vertex1.y) +
          vertex3.x * (vertex1.y - vertex2.y)
      );
    return area;
  };

  const calculateAngle = (vertexA, vertexB, vertexC) => {
    const sideA = calculateDistance(vertexB, vertexC);
    const sideB = calculateDistance(vertexA, vertexC);
    const sideC = calculateDistance(vertexA, vertexB);
    return (
      (Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) *
        180) /
      Math.PI
    );
  };

  const determineAngleType = (angles) => {
    if (angles.some((angle) => angle > 90)) {
      return "Tupokutni trokut";
    } else if (angles.every((angle) => angle < 90)) {
      return "Šiljastokutni trokut";
    } else {
      return "Pravokutni trokut";
    }
  };

  const determineSideType = (sides) => {
    const uniqueSides = Array.from(new Set(sides));
    if (uniqueSides.length === 1) {
      return "Jednakostranični trokut ";
    } else if (uniqueSides.length === 2) {
      return "Jednakokračni trokut";
    } else {
      return "Raznostranični trokut";
    }
  };

  const { vertex1, vertex2, vertex3 } = isEditing ? editedVertices : triangle;
  const side1 = calculateDistance(vertex1, vertex2);
  const side2 = calculateDistance(vertex2, vertex3);
  const side3 = calculateDistance(vertex3, vertex1);
  const angles = [
    calculateAngle(vertex1, vertex2, vertex3),
    calculateAngle(vertex2, vertex3, vertex1),
    calculateAngle(vertex3, vertex1, vertex2),
  ];
  const area = calculateTriangleArea(vertex1, vertex2, vertex3);
  const perimeter = side1 + side2 + side3;

  // Generate PDF for the selected triangle
  const handleGeneratePDF = () => {
    generatePDF(triangle);
  };

  return (
    <div className="triangle-card">
      <h2>Trokut</h2>
      <svg width="350" height="350">
        <polygon
          points={`${vertex1.x},${vertex1.y} ${vertex2.x},${vertex2.y} ${vertex3.x},${vertex3.y}`}
          fill="lightblue"
          stroke="black"
        />
      </svg>
      <p>
        Točke: ({vertex1.x}, {vertex1.y}), ({vertex2.x}, {vertex2.y}), (
        {vertex3.x}, {vertex3.y})
      </p>
      <p>
        Stranice: {side1.toFixed(2)}, {side2.toFixed(2)}, {side3.toFixed(2)}
      </p>
      <p>Opseg: {perimeter}</p>
      <p>Površina: {area}</p>

      <p>Vrsta po kutovima: {determineAngleType(angles)}</p>
      <p>
        Vrsta prema odnosu duljina stranica:{" "}
        {determineSideType([side1, side2, side3])}
      </p>
      <button onClick={handleGeneratePDF}>Generiraj PDF</button>
      {isEditing ? (
        <div>
          <label>Točka 1:</label>
          <input
            type="number"
            name="x"
            value={editedVertices.vertex1.x}
            onChange={(e) => handleEditChange(e, "vertex1")}
          />
          <input
            type="number"
            name="y"
            value={editedVertices.vertex1.y}
            onChange={(e) => handleEditChange(e, "vertex1")}
          />
          <br />
          <label>Točka 2:</label>
          <input
            type="number"
            name="x"
            value={editedVertices.vertex2.x}
            onChange={(e) => handleEditChange(e, "vertex2")}
          />
          <input
            type="number"
            name="y"
            value={editedVertices.vertex2.y}
            onChange={(e) => handleEditChange(e, "vertex2")}
          />
          <br />
          <label>Točka 3:</label>
          <input
            type="number"
            name="x"
            value={editedVertices.vertex3.x}
            onChange={(e) => handleEditChange(e, "vertex3")}
          />
          <input
            type="number"
            name="y"
            value={editedVertices.vertex3.y}
            onChange={(e) => handleEditChange(e, "vertex3")}
          />
          <br />
          <button onClick={saveEditedTriangle}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={() => onDelete(triangle.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Triangle;
