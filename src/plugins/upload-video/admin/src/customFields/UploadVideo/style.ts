import { CSSProperties } from "react";

const style : {[key: string]: CSSProperties} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    loaderContainer: {
        position: "absolute",
        top: "1rem",
        height: "calc(100% - 1rem)",
        width: "100%",
    },
    textInputContainer: {
        position: "relative",
    }, 
    uploadFileContainer: {
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
    },
    or: {
        width: "100%",
        textAlign: "center"
    },
    uploadFile: {
        cursor: "pointer",
        border: "1px solid black",
        textAlign: "center",
        width: "max-content",
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    }
}

export default style;