import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date",
    cellRenderer: (data: {value: string}) => {
      // we receive the value of discovery date and give a shorter format
      return data.value ? (new Date(data.value)).toLocaleDateString() : '';
    }
  },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous",
    cellRenderer: (data: {value: string}) => {
      let label = '';
      if (data.value && data.value === 'N') label = 'No'
      if (data.value && data.value === 'Y') label = 'Yes'
      return label
    }
  },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h1>Near-Earth Object Overview</h1>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
