import React, {useMemo, useRef} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { hover } from "@testing-library/user-event/dist/hover";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true, 
    filter: 'agTextColumnFilter'
  },
  { field: "discovery_date", headerName: "Discovery Date", sortable: true,
    filter: 'agDateColumnFilter',
    valueGetter: (params) => {
      return new Date(params.data.discovery_date)
    },
    valueFormatter: (params: {value: string}) => {
      // we receive the value of discovery date and give a shorter format
      return params.value ? (new Date(params.value)).toLocaleDateString() : '';
    }
  },
  { field: "h_mag", headerName: "H (mag)", sortable: true,
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.h_mag ? Number(params.data.h_mag) : params.data.h_mag
    }
  },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, 
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.moid_au ? Number(params.data.moid_au) : params.data.moid_au
    }
  },
  { field: "q_au_1", headerName: "q (au)", sortable: true,
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.q_au_1 ? Number(params.data.q_au_1) : params.data.q_au_1
    }
  },
  { field: "q_au_2", headerName: "Q (au)", sortable: true,
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.q_au_2 ? Number(params.data.q_au_2) : params.data.q_au_2
    }
  },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, 
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.period_yr ? Number(params.data.period_yr) : params.data.period_yr
    }
  },
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true,
    filter: 'agNumberColumnFilter',
    valueGetter: (params) => {
      return params.data.i_deg ? Number(params.data.i_deg) : params.data.i_deg
    }
  },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true,
    valueFormatter: (params: {value: string}) => {
      let label = '';
      if (params.value && params.value === 'N') label = 'No'
      if (params.value && params.value === 'Y') label = 'Yes'
      return label
    },
    filter: 'agTextColumnFilter'
  },
  { field: "orbit_class", headerName: "Orbit Class", 
    enableRowGroup: true, sortable: true,
    filter: 'agTextColumnFilter'
  },
];

const NeoGrid = (): JSX.Element => {

  const gridRef = useRef<AgGridReact>(null);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: false,
      flex: 1,
      minWidth: 200,
    };
  }, []);

  const resetDefaultTable = () => {
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { sort: null },
    })
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '85vh', width: '99%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <h1 style={{color: '#52657d'}}>Near-Earth Object Overview</h1>
        <button 
          style={{
            border: 'solid 1px #dbdbdb',
            background: '#f3f3f3',
            color: '#484141',
            width: 'auto',
            height: '40px',
            fontSize: '11pt',
            padding: '10px',
            margin: '0 0 0 15px',
            borderRadius: '15px'
          }}
          onClick={resetDefaultTable}>
            Clear Filters and Sorters
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        defaultColDef={defaultColDef}
        enableRangeSelection={true}
        copyHeadersToClipboard={true}
      />
    </div>
  );
};

export default NeoGrid;
