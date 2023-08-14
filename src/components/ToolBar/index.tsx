import { ReactNode } from "react"

interface ToolbarProps {
    children?: ReactNode,
    style?: React.CSSProperties,
}

const ToolBar = ({children, style}: ToolbarProps) => (
    <div
    className="top-0 left-0 pl-8 pr-8 w-screen h-20 flex flex-row, mb-4"
    style={style}
    >
    {children}
    </div>
)

export default ToolBar