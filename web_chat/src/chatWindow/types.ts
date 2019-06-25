export type ChatEntry = {
    isOwn: boolean;
    value: string;
};

export type ChatWindowProps = {
    name?: string;
    data: ChatEntry[];
    bottom?: JSX.Element;
    onUserInput: (message: string, data: ChatEntry[]) => void;
    headerContentComponent?: ((p: any) => JSX.Element) | JSX.Element | null;
    optionsComponent?: ((p: any) => JSX.Element) | JSX.Element | null;
    avatars?: {own: JSX.Element | string; other: JSX.Element | string};
};
