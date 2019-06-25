import React, {useState} from "react";
import {ChatWindow} from "./chatWindow/ChatWindow";
import {ChatEntry} from "./chatWindow/types";
import {Person} from "./icons/Person";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {Typography, Tooltip, Button} from "@material-ui/core";
import {uuid} from "./uuid";

function App() {
    const [sessionId, setsessionId] = useState(uuid());
    const [name, setName] = useState("Chat");
    const [goal, setGoal] = useState("Just chatting");
    const [data, setData] = useState([] as ChatEntry[]);
    const [isChatDone, setisChatDone] = useState(false);
    const [isChatFailed, setisChatFailed] = useState(false);

    const onUserInput = async (message: string, resultData: ChatEntry[]) => {
        setData([...resultData]);
        try {
            const reply = await fetch("/handleUserInput", {
                method: "POST",
                body: JSON.stringify({text: message, sessionId}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const a = reply.status === 200 ? await reply.json() : null;
            a && setData([{isOwn: false, value: a.data.text}, ...resultData]);
        } catch (e) {
            return null;
        }
    };

    const clearSession = () => {
        setData([] as ChatEntry[]);
        setisChatDone(false);
        setisChatFailed(false);
    };

    const headerContentComponent = (
        <div style={{display: "flex"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <img style={{width: "48px"}} src={window.location.origin + "/botIconLarge.png"} />
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "8px"}}>
                <div style={{textAlign: "left"}}>
                    <Typography variant="body1" style={{color: "white"}}>
                        {name}
                    </Typography>
                </div>
                <div style={{textAlign: "left"}}>
                    <Typography variant="caption" style={{color: "white"}}>
                        {goal}
                    </Typography>
                </div>
            </div>
        </div>
    );
    const bottom = isChatDone ? (
        <Tooltip title={isChatFailed ? "Could not achieve goal" : "Goal achieved"}>
            <Button
                style={{color: isChatFailed ? "red" : "white"}}
                color={"primary"}
                variant="outlined"
                fullWidth
                onClick={() => clearSession()}>
                {isChatFailed ? "Goal not achieved - reset" : "Goal achieved - reset"}
            </Button>
        </Tooltip>
    ) : (
        undefined
    );
    return (
        <MuiThemeProvider theme={createMuiTheme()}>
            <div style={{height: "80%", position: "absolute", right: "24px", bottom: "24px"}}>
                <ChatWindow
                    {...{
                        data: {
                            bottom,
                            name,
                            data,
                            headerContentComponent,
                            onUserInput,
                            avatars: {
                                own: <Person />,
                                other: window.location.origin + "/botIcon.png"
                            }
                        }
                    }}
                />
            </div>
        </MuiThemeProvider>
    );
}

export default App;
