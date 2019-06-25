import React, {useRef, useEffect} from "react";
import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        containerStyle: {
            width: "100%",
            height: "100%",
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column" as "column"
        }
    };
});

export const ChatContainer = (p: {children: any}) => {
    const mref = useRef(null as null | HTMLDivElement);
    const classes = useStyles();

    useEffect(() => {
        const cur = mref.current;
        if (!cur || !cur.parentElement) return;
        const top = cur.scrollHeight - cur.parentElement.clientHeight;
        cur.scrollTo({
            top,
            behavior: "smooth"
        });
    });
    return (
        <div className={classes.containerStyle} ref={mref}>
            {p.children}
        </div>
    );
};
