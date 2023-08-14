interface DrawerProps {
    children?: JSX.Element[],
    open?: boolean,
    widthPx: number,
}

const Drawer = ({children, open, widthPx}:DrawerProps) => {
    return (
        <div
        style={{zIndex: 1000}}
        className="absolute top-0 left-0 flex flex-row"
        >
            <div
            style={{width: `${open? widthPx : 0}px`, zIndex: 1000}}
            className="h-screen ease-in-out drop-shadow-xl duration-500 bg-white overflow-hidden"
            >
                <div style={{width: widthPx}}>
                {children}
                </div>
            </div>
            
            {
            //dark overlay when sidebar is open
            /* <div
            className={`absolute left-0 top-0 h-screen bg-black opacity-60 ${open ? "w-screen" : "w-0"}`}
            onClick={() => {open = !open}}
            >
            </div> */
            }
        </div>
    )
}

export default Drawer
