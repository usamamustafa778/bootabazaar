import React from "react";
import MUIDataTable from "../components/common/MUIGrid";
import { CheckBox, SearchBox } from "../components";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import { btnPrimary, btnPrimaryDark } from "../style/mui";
import { useDarkMode } from "../utils/useDarkMode";

export default function Sitemanager() {
  const columns = [
    {
      field: "checkbox",
      renderHeader: () => <CheckBox />,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => <CheckBox />,
    },
    { headerName: "Sr#", field: "serial", width: "" },
    { headerName: "Site", field: "site", width: "" },
    { headerName: "Industry", field: "industry", width: "" },
    { headerName: "Type", field: "type", width: "" },
    { headerName: "Template", field: "template", width: "" },
    { headerName: "Phone", field: "phone", width: "" },
    { headerName: "Address", field: "address", width: "" },
    { headerName: "Email", field: "email", width: "" },
    { headerName: "DR", field: "dr", width: "" },
    { headerName: "UR", field: "ur", width: "" },
    { headerName: "Created At", field: "created_at", width: "" },
  ];

  const [isDarkMode] = useDarkMode();

  // Table Tool Bar
  function CustomToolbar({ setFilterButtonEl }) {
    return (
      <GridToolbarContainer className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GridToolbarColumnsButton
            variant="contained"
            sx={isDarkMode ? btnPrimaryDark : btnPrimary}
          />
          <GridToolbarDensitySelector
            variant="contained"
            sx={isDarkMode ? btnPrimaryDark : btnPrimary}
          />
          <GridToolbarFilterButton
            variant="contained"
            sx={isDarkMode ? btnPrimaryDark : btnPrimary}
            ref={setFilterButtonEl}
          />
          <button className="btnWhite">Change Industry</button>
          <button className="btnWhite">Change Type</button>
          <button className="btnWhite">Change Template</button>
        </div>
        <SearchBox
          className="bg-white dark:bg-gray-800 border dark:border-white/10 border-gray-300 shadow shadow-gray-300 dark:shadow-gray-800 w-fit"
          placeholder="Search website"
        />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div className="border-b dark:border-white/20 flex items-center flex-wrap w-full text-sm px-6 backdrop-blur-md bg-gray-700 dark:bg-gray-950/30">
        <button className="px-3 py-2 font-medium text-white/80">Sites</button>
        <button className="px-3 py-2 font-medium text-white/80">
          Industries
        </button>
      </div>
      <div className="p-6">
        <MUIDataTable CustomToolbar={CustomToolbar} columnDefs={columns} />
      </div>
    </>
  );
}
