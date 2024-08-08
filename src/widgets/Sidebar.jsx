import React from "react";
import style from "../style/sidebar.module.css";
import IconButton from "./IconButton";
import { NavLink } from "react-router-dom";

function Sidebar({ children }) {
    return (
        <div className={style.body}>
            <div className={style.sidebar}>
                <div>
                    <h1 className={style.headding}>Productoo</h1>
                </div>
                <div className={style.buttonContainer}>
                    <div className={style.topButtonContainer}>
                        <NavLink to={"products"}>
                            <IconButton title="Products" />
                        </NavLink>
                    </div>
                    <div className={style.bottomButtonContainer}>
                        <NavLink to="/login">
                            <IconButton title="logout" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={style.children}>{children}</div>
        </div>
    );
}

export default Sidebar;
