<script lang="ts">
  type TableDataType = {
    headers: [string];
  };

  const invoices = JSON.parse(localStorage.getItem('invoices'));

  export let tableData = invoices;

  console.log(invoices);

  function findTableHeaders(tableData: {}[]): string[] {
    const headers = Object.keys(tableData[0]);
    return headers;
  }

  function findTableRows(tableData: {}[]): {}[] {
    const rows = Object.values(tableData);
    return rows;
  }
  function findTableCells(rows: {}): {}[] {
    const cells = Object.values(rows);
    return cells;
  }

  let tableHeaders = findTableHeaders(tableData);
  let rows = findTableRows(tableData);
  let cells = findTableCells(rows);
</script>

<div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        {#each tableHeaders as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each findTableCells(row) as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
