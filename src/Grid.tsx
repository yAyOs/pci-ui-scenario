import React, {useMemo, useRef} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import columnDefs from './components/GridConfig'
import Header from "./components/Header";

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
      <div className="ag-theme-alpine" style={{ height: '85vh', width: '99%', margin: 'auto'}}>
        <Header resetDefaultTable={resetDefaultTable}/>
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
