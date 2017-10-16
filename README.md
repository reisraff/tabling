# Tabling

The tool to generate a pagination with a pure js, no jQuery required.

## Usage

HTML file

```html
<div id="table-1">
  <div>
    <input type="text" placeholder="handle: all events" handle-event/>
    <input type="text" placeholder="handle: click,keyup event(s)" handle-event="click,keyup"/>
  </div>

  <table>
    <thead>
      <tr>
        <th column-id="id" sortable>Id</th>
        <th column-id="name" sortable>Name</th>
        <th column-id="email" sortable>Email</th>
        <th column-id="actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr line>
        <td column-id="id"></td>
        <td column-id="name"></td>
        <td column-id="email"></td>
        <td column-id="actions">
          <a href="edit.php/%id%">edit</a>
          <a href="delete.php/%id%">delete</a>
          <a href="view.php/%id%">view</a>
        </td>
      </tr>
    </tbody>
  </table>

  <div>Page <span id="currentPage"></span> of <span id="totalPages"></span></div>
  <div>
    <ul>
      <li first-page><a href="#"><<</a></li>
      <li prev-page><a href="#"><</a></li>
      <li page><a href="#">%page%</a></li>
      <li next-page><a href="#">></a></li>
      <li last-page><a href="#">>></a></li>
    </ul>
  </div>
</div>

<script src="tabling.js"></script>

<script>
  var data = {
    page: 1,
    perPage: 5,
  };

  var table = tabling({
    elementId : 'table-1',
    endingpointUrl : 'example/data.json'
  });

  table.on('keyup', function (el, e) {
    data.search = el.value;
    table.request();
  });

  table.setRequestHandler(function () {
    return {
      headers : [
        {
          header: 'Content-type',
          value: 'application/json'
        }
      ],
      data: data
    };
  });

  table.setResponseHandler(function (response) {
    response = JSON.parse(response);
    table.flush();
    table.addLines(response.data);
    table.setPagination(response.meta.pagination);

    document.getElementById("currentPage").innerHTML = response.meta.pagination.currentPage;
    document.getElementById("totalPages").innerHTML = response.meta.pagination.totalPages;
  });

  table.setPaginationHandler(function (page) {
    data.page = page;
    table.request();
  });

  table.setSortingHandler(function (sort) {
    console.log(sort);
  });

  table.init();
</script>
```
