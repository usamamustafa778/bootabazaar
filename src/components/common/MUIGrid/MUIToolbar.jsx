import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import React from "react";

function MUIToolbar({ setFilterButtonEl }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton className="!text-[#042a42]" />
      <GridToolbarFilterButton
        ref={setFilterButtonEl}
        className="!text-[#042a42] btnSecondary"
      />
      <GridToolbarDensitySelector className="!text-[#042a42]" />
    </GridToolbarContainer>
  );
}

export default MUIToolbar;
