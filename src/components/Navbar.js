import React from 'react'
import { NavLink } from "react-router-dom";

const style = {
    siteName: {
        marginRight: "40%",
        fontSize: "xx-large",
        textDecoration: "none",
        letterSpacing: "3px",
        color: "white"
    },
    navbar: {
        backgroundColor: "#840b70",
        textAlign: "center",
        fontSize: "20px",
        padding: 15,
        margin: 0,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
    }
}

export default function Navbar() {
    return (
        <ul className="font" style={style.navbar}>
            <NavLink style={style.siteName} to="#"><b>KaviApp.Maker</b></NavLink>
            <NavLink style={{ color: "black", textDecoration: "none", paddingLeft: 10, cursor: "not-allowed", opacity: "0.5" }} activeStyle={{ color: "white" }} to="#" disabled >Save</NavLink>
            <NavLink style={{ color: "white", textDecoration: "none", paddingLeft: 10, cursor: "not-allowed", opacity: "0.5" }} activeStyle={{ color: "white" }} to="#" >Reset</NavLink>
            <NavLink style={{ backgroundColor: "white", color: "#840b70", textDecoration: "none", margin: 20, padding: 5, paddingLeft: 20, paddingRight: 20, borderRadius: 30, cursor: "not-allowed", opacity: "0.5" }} to="#" >Build</NavLink>
        </ul>
    );
}
