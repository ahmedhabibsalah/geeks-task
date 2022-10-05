import React, { useCallback, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

let newCount = 1;

const createNewRowData = () => {
  const newData = {
    id: 1 + newCount * 3,
    name: "Ahmed " + newCount,
    last_name: "XYZ " + newCount,
    status: "Available" + newCount,
  };
  newCount++;
  return newData;
};

const printResult = (res) => {
  console.log("---------------------------------------");
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log("Added Row Node", rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log("Removed Row Node", rowNode);
    });
  }
};
function Grid() {
  const gridRef = useRef();

  const [rowData] = useState([
    { id: 1, name: "Ali", last_name: "XYZ", status: "Available" },
    { id: 2, name: "Sara", last_name: "YXZ", status: "busy" },
    { id: 3, name: "Samy", last_name: "ZYX", status: "Available" },
  ]);
  const addItems = useCallback((addIndex) => {
    const newItems = [createNewRowData()];
    const res = gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    printResult(res);
  }, []);
  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({ remove: selectedData });
    printResult(res);
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "40px 10px",
          gap: "30px",
        }}
      >
        <button onClick={() => addItems(undefined)}>Add Random</button>
        <button onClick={onRemoveSelected}>Delete Selected</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          autoGroupColumnDef={{
            headerName: "ID",
            field: "id",
            minWidth: 250,
            cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { checkbox: true },
          }}
          rowSelection={"multiple"}
          groupSelectsChildren={true}
          suppressRowClickSelection={true}
          suppressAggFuncInHeader={true}
        >
          <AgGridColumn field="id" rowGroup={true} hide={true}></AgGridColumn>
          <AgGridColumn field="name"></AgGridColumn>
          <AgGridColumn field="last_name"></AgGridColumn>
          <AgGridColumn field="status"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}

export default Grid;
