import React from "react";
import {ChatWindowProps} from "./types";
import {makeStyles} from "@material-ui/styles";
import {Theme, Paper, Typography, Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        headerStyle: {
            position: "relative" as "relative",
            background: "linear-gradient(to right, rgba(7,19,64,1) 0%, rgba(1,165,224,1) 100%)",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            // borderBottom: "0.5px solid black",
            textAlign: "center" as "center",
            padding: "8px",
            display: "flex"
        },
        extraButton: {
            position: "absolute" as "absolute",
            top: 0,
            right: 0
        }
    };
});

export const ChatHeader = (p: {data: ChatWindowProps}) => {
    const classes = useStyles();
    const {data} = p;
    return (
        <Paper className={classes.headerStyle}>
            {data.headerContentComponent ? (
                data.headerContentComponent
            ) : (
                <Typography variant="h6" style={{color: "white"}}>
                    {data.name}
                </Typography>
            )}
            <span className={classes.extraButton}>{data.optionsComponent}</span>
        </Paper>
    );
};
