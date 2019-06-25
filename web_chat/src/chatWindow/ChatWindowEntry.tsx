import React from "react";
import {makeStyles, Theme, Avatar} from "@material-ui/core";
import {ChatEntry} from "./types";

const useStyles = makeStyles((theme: Theme) => {
    const otherEntryStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "row" as "row",
        position: "relative" as "relative"
    };

    const ownEntryStyle = {
        position: "relative" as "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse" as "row-reverse",
        marginLeft: `${-theme.spacing(1)}px`
    };

    const textStyle = {
        boxShadow: "-4px 4px 8px 0px rgba(0,0,0,0.2)",
        display: "flex",
        backgroundColor: "white",
        color: "black",
        padding: `${theme.spacing(1)}px`,
        margin: `${theme.spacing(2)}px`,
        borderRadius: `${theme.spacing(1)}px`
    };

    const otherTextStyle = {
        ...textStyle,
        marginRight: `${theme.spacing(6)}px`
    };

    const ownTextStyle = {
        ...textStyle,
        marginLeft: `${theme.spacing(6)}px`,
        backgroundColor: "rgba(255,255,255,0.25)"
    };

    const avatar = {
        margin: `${theme.spacing(1) / 2}px`,
        width: `${theme.spacing(4)}px`,
        height: `${theme.spacing(4)}px`,
        position: "absolute" as "absolute"
    };

    const avatarOwn = {
        ...avatar,
        right: "0px",
        top: "0px"
    };

    const avatarOther = {
        ...avatar,
        left: "0px",
        top: "0px"
    };

    const textWrapperOwn = {
        minWidth: "100px",
        marginRight: `${theme.spacing(1)}px`
    };
    const textWrapperOther = {
        minWidth: "100px",
        marginLeft: `${theme.spacing(1)}px`
    };

    return {
        otherEntryStyle,
        otherTextStyle,
        ownEntryStyle,
        ownTextStyle,
        avatarOwn,
        avatarOther,
        textWrapperOwn,
        textWrapperOther
    };
});

const getAvatar = (className: string, content: string | JSX.Element) => {
    return typeof content === "string" ? (
        <Avatar className={className} src={content} />
    ) : (
        <Avatar className={className}>{content}</Avatar>
    );
};

export const ChatWindowEntry = (p: {
    children?: any;
    data: ChatEntry;
    avatars?: {own: JSX.Element | string; other: JSX.Element | string};
}) => {
    const classes = useStyles();
    return (
        <div className={p.data.isOwn ? classes.ownEntryStyle : classes.otherEntryStyle}>
            <div className={p.data.isOwn ? classes.ownTextStyle : classes.otherTextStyle}>
                {p.avatars && !p.data.isOwn ? getAvatar(classes.avatarOther, p.avatars.other) : null}
                <div className={p.data.isOwn ? classes.textWrapperOwn : classes.textWrapperOther}>{p.data.value}</div>
                {p.avatars && p.data.isOwn ? getAvatar(classes.avatarOwn, p.avatars.own) : null}
            </div>
        </div>
    );
};
