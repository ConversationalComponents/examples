import React, {useRef} from "react";
import {ChatWindowProps} from "./types";
import {makeStyles} from "@material-ui/styles";
import {Theme, Paper, IconButton} from "@material-ui/core";
import {Send} from "../icons/Send";

const useStyles = makeStyles((theme: Theme) => {
    return {
        bottomContainer: {
            width: "calc(100% - 1px)",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            background: "linear-gradient(to right, rgba(126,206,255,1) 0%, rgba(1,165,224,1) 100%)",
            // borderTop: "0.5px solid black",
            display: "flex",
            justifyConent: "center"
        },
        inputContainer: {
            width: "100%",
            display: "flex"
        },
        input: {
            flex: 1,
            textAlign: "left" as "left",
            height: `${theme.spacing(4)}px`,
            margin: `${theme.spacing(1)}px`,
            marginLeft: `${theme.spacing(2)}px`,
            paddingLeft: `${theme.spacing(1)}px`
        }
    };
});

export const ChatFooter = (p: {data: ChatWindowProps}) => {
    const classes = useStyles();
    const inputRef = useRef(null as null | HTMLInputElement);
    const {data} = p;
    const updateMessages = () => {
        if (!inputRef.current) return;
        if (!inputRef.current.value) return;
        data.data.unshift({isOwn: true, value: inputRef.current.value});
        data.onUserInput(inputRef.current.value, data.data);
        inputRef.current.value = "";
    };
    return (
        <Paper className={classes.bottomContainer}>
            {data.bottom ? (
                data.bottom
            ) : (
                <div className={classes.inputContainer}>
                    <input
                        className={classes.input}
                        ref={inputRef}
                        type="text"
                        name="fname"
                        onKeyDown={e => e.key === "Enter" && updateMessages()}
                    />
                    <IconButton size="medium" onClick={updateMessages}>
                        <Send style={{color: "white"}} />
                    </IconButton>
                </div>
            )}
        </Paper>
    );
};
