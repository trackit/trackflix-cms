interface ToolbarProps {
    children?: JSX.Element[] | JSX.Element,
    style?: React.CSSProperties,
}

const ToolBar = ({children, style}: ToolbarProps) => (
    <div
    className="fixed top-0 left-0 pl-8 pr-8 w-screen h-20 flex flex-row"
    style={style}
    >
    {children}
    </div>
)

export default ToolBar