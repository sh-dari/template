import React from "react";
import {Route, Routes} from 'react-router-dom';
import Popular from "./components/popular/Popular";
import Search from "./components/search/Search";
import './styles/App.css';

function App() {
    return (
        <Routes>
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/*" element={<Popular />} />
        </Routes>
    );
}

export default App;