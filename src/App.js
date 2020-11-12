import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Stage, Layer, Rect, Text, Circle, Line, Image, Shape } from 'react-konva';
import ReactDOM from 'react-dom';
import Portal from './components/Portal';
import useImage from 'use-image';
import Navbar from "./components/Navbar";
import Tools from "./components/Tools";
import "./App.css";

const App = () => {

  return (
    <Router>
      <Navbar style={{ paddingBottom: "500" }} />
      <Tools />
    </Router >
  );
};


export default App;