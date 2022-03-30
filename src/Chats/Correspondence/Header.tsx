interface IHeaderProps {
    name: string;
}

export default function (props: IHeaderProps) {
    return (
        <div className="chat-correspondence">
            <div className="chat-correspondence__name">{props.name}</div>
        </div>
    );
}