import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import MUIToolbar from "./MUIToolbar";

const MUIDataTable = (props) => {
  const {
    totalItems,
    onPageSizeChange,
    onPaginationModelChange,
    paginationModel,
    items,
    columnDefs,
    getRowId,
    paginationMode,
    gridOptions,
    autoHeight,
    checkboxSelection,
    onRowSelectionModelChange,
    ref,
    customSize,
    pagination,
    height,
    onFilterModelChange,
    CustomToolbar,
    processRowUpdate,
    onCellEditStart,
    onProcessRowUpdateError,
    onCellEditStop,
    cellModesModel,
    rowModesModel,
    onRowModesModelChange,
    onRowEditStart,
    onRowEditStop,
    onRowEditCommit,
    pinnedColumns,
    rowReordering,
    handleRowOrderChange,
    getRowClass,
    className,
  } = props;

  return (
    <div
      className={`ml-auto mr-auto relative ${className}`}
      style={{ overflowX: "hidden" }}
    >
      {columnDefs && (
        <div style={{ height: height ? height : "62vh", width: "100%" }}>
          <DataGridPro
            ref={ref}
            rows={props.isLoading ? [] : items ? items : []}
            columns={columnDefs}
            pagination={pagination === "No" ? false : true}
            paginationModel={
              pagination === "No"
                ? { page: 1, pageSize: items?.length }
                : {
                    page: +paginationModel?.page - 1,
                    pageSize: +paginationModel?.pageSize,
                  }
            }
            page={pagination === "No" ? 1 : paginationModel?.page}
            pageSize={
              pagination === "No" ? items?.length : paginationModel?.pageSize
            }
            getRowClassName={getRowClass}
            rowCount={totalItems ? totalItems : 0}
            onPaginationModelChange={onPaginationModelChange}
            onPageSizeChange={onPageSizeChange}
            paginationMode={paginationMode ? paginationMode : "server"}
            components={{
              Toolbar: CustomToolbar ? CustomToolbar : MUIToolbar,
            }}
            loading={props.isLoading}
            componentsProps={{
              toolbar: {
                className: "bg-gray-200 shadow-sm",
              },
            }}
            checkboxSelection={checkboxSelection}
            getRowId={(row) =>
              getRowId
                ? getRowId
                : row?.counter
                ? row?.counter
                : row?.records?._id
                ? row?.records?._id
                : row?.id
                ? row?.id
                : row?._id
                ? row?._id
                : row?.records?.id
                ? row?.records?.id
                : row?.status
            }
            headerHeight={40}
            classes={{
              root: "border border-gray-400 dark:border-white/10 dark:text-white",
              main: "bg-white dark:bg-gray-800 rounded-md p-3",
              columnHeadersInner: "bg-gray-200 dark:bg-gray-900",
              columnHeaders:
                "bg-gray-200 dark:bg-gray-900 shadow-sm dark:text-white/80 font-bold text-md capitalize text-black",
              row: "text-md hover:bg-gray-200",
            }}
            onFilterModelChange={onFilterModelChange}
            pageSizeOptions={[
              25,
              50,
              75,
              100,
              250,
              500,
              1000,
              1500,
              customSize ? customSize : totalItems ? totalItems : 0,
            ]}
            autoHeight={autoHeight}
            getRowHeight={gridOptions}
            onRowSelectionModelChange={onRowSelectionModelChange}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={onProcessRowUpdateError}
            onCellEditStart={onCellEditStart}
            onCellEdit
            onCellEditStop={onCellEditStop}
            cellModesModel={cellModesModel}
            editMode={"row"}
            rowModesModel={rowModesModel}
            onRowModesModelChange={onRowModesModelChange}
            onRowEditStart={onRowEditStart}
            onRowEditStop={onRowEditStop}
            onRowEditCommit={onRowEditCommit}
            pinnedColumns={pinnedColumns}
            rowReordering={rowReordering}
            onRowOrderChange={handleRowOrderChange}
          />
        </div>
      )}
    </div>
  );
};

export default MUIDataTable;
