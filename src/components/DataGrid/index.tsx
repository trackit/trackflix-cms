import { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { IconButton } from "../Button"

export interface DataGripsColumnDef {
    field: string,
    headerName: string,
    width: number,
    editable: boolean,
}

interface DataGridProps {
    rows: any[],
    columns: DataGripsColumnDef[],
    initialState?: any,
    pageSize?: number,
    checkboxSelect?: boolean,
    onSelectChange?: (selectedRows: any[]) => void,
    onRowClick?: (row: any) => void,

}

export const DataGrid = (props: DataGridProps) => {

    const pageSize = props.pageSize ? props.pageSize : 10;
    const selectedRows: any[] = [];
    const [currentPage, setCurrentPage] = useState(0);
    const pages = PaginateRows();
    const page = pages[currentPage];
    const lineHover = props.onRowClick ? "hover:underline" : ""

    const nextPage = () => {
        if (currentPage < props.rows.length / pageSize)
            setCurrentPage(currentPage + 1);
    }
    const previousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1);
    }

    const couldGoNextPage = () => currentPage < props.rows.length / pageSize - 1;
    const couldGoPreviousPage = () => currentPage > 0;

    const selectRow = (row: any) => {
        if (selectedRows.includes(row)) {
            const index = selectedRows.indexOf(row);
            selectedRows.splice(index, 1);
        } else {
            selectedRows.push(row);
        }
        if (props.onSelectChange) {
            props.onSelectChange(selectedRows);
        }
    }

    function PaginateRows() {
        const paginatedElements = []
        let lastIndex = 0;
        for (let i = 1; i < props.rows.length; i++) {
            if (i % pageSize === 0) {
                paginatedElements.push(props.rows.slice(lastIndex, i));
                lastIndex = i;
            }
        }
        paginatedElements.push(props.rows.slice(lastIndex, props.rows.length));
        return paginatedElements;
    }

    const ColumnHeader = ({headerName, width}: {headerName: string, width: number}) => {
        return (
            <div
            style={{width: width}}
            className="w-full w-full pl-4 pr-4 pt-3 pb-3">
                {headerName}
            </div>
            )
    }

    const checkBoxDef = "flex items-center w-8 h-8 ml-4 mr-2"

    return (
        <div className="w-max rounded-l-lg flex flex-col rounded-e border-2 overflow-hidden">
            <div className="flex flex-row border-0 border-b-2 bg-gray-100">
                {
                    props.checkboxSelect && <div className={checkBoxDef} />
                }
                {
                    props.columns.map((col, index) =>
                        <ColumnHeader key={index} headerName={col.headerName} width={col.width}  />
                    )
                }
            </div>
            {
                page.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={`flex flex-row items-center ${rowIndex !== page.length - 1 ? "border-b-2": ""} `}>
                            {
                                props.checkboxSelect &&
                                <div className={checkBoxDef}>
                                    <input
                                    className="w-4 h-4 cursor-pointer"
                                    type="checkbox"
                                    onChange={() => selectRow(row)} />
                                </div>
                            }
                            {
                                props.columns.map((col, colIndex) => {
                                    return (
                                        <div key={(rowIndex + 1) * colIndex}
                                        style={{width: col.width}}
                                        className={`w-full p-4 border-0 ${colIndex !== props.columns.length - 1 ? "border-r-2" : ""} `}
                                        >
                                            <p
                                            className={`${lineHover} m-0 w-max cursor-pointer`}
                                            onClick={() => {if (props.onRowClick) props.onRowClick(row) }}
                                            >
                                                {row[col.field]}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <div className="flex flex-row justify-end items-center p-1.5 border-0 border-t-2 bg-white">
                <div className="flex flex-row items-center">
                    <div className="text-gray-500 text-sm">
                        {currentPage * pageSize + 1} - {currentPage * pageSize + page.length} of {props.rows.length}
                    </div>
                    <IconButton
                    color={couldGoPreviousPage() ? "primary" : "disabled"}
                    icon={KeyboardArrowLeft}
                    onClick={previousPage}
                    />
                    <IconButton
                    color={couldGoNextPage() ? "primary": "disabled"}
                    icon={KeyboardArrowRight}
                    onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataGrid;
