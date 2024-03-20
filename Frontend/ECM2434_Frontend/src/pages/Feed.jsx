import React from "react";
import classes from "./Feed.module.css";
import { FeedCards } from "../components/feedCards";

// Author: Callum Young(Cufe12345)
export default function Feed() {
    return (
        <div className={classes.container}>
            <FeedCards />
        </div>
    )};