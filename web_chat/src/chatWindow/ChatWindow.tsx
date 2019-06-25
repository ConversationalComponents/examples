import React, {useEffect, useState} from "react";
import {ChatWindowProps} from "./types";
import {makeStyles, Theme, Paper} from "@material-ui/core";
import {ChatContainer} from "./ChatContainer";
import {ChatWindowEntry} from "./ChatWindowEntry";
import {ChatHeader} from "./ChatHeader";
import {ChatFooter} from "./ChatFooter";
import {autorun} from "mobx";

const useStyles = makeStyles((theme: Theme) => {
    return {
        windowStyle: {
            boxShadow: "-4px 4px 8px 0px rgba(0,0,0,0.2)",
            background: "rgba(255,255,255,.2)",
            width: `${theme.spacing(40)}px`,
            height: "calc(100% - 20px)",
            display: "flex",
            flexDirection: "column" as "column"
        }
    };
});

export const ChatWindow = (p: {data: ChatWindowProps}) => {
    const classes = useStyles();
    const {data} = p;
    const [entries, setEntries] = useState(data.data);
    const [numEntries, setnumEntries] = useState(data.data.length);
    useEffect(() => {
        return autorun(() => {
            const l = data.data.length;
            setnumEntries(l);
            setEntries(data.data);
        });
    }, [data.data]);

    return (
        <Paper className={classes.windowStyle}>
            <ChatContainer>
                <ChatHeader {...{data}} />
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column-reverse",
                        height: "100%",
                        overflow: "auto"
                    }}>
                    {entries.map((entry, i) => {
                        return <ChatWindowEntry key={`${i}`} {...{data: entry, avatars: data.avatars}} />;
                    })}
                </div>
                <ChatFooter {...{data}} />
            </ChatContainer>
        </Paper>
    );
};
