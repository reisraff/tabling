/**
 *
 */
var tabling = function (obj) {
  var _self = this;

  _self.elementId = obj.elementId || '';
  _self.endingpointUrl = obj.endingpointUrl || '';
  _self.paginator = obj.paginator || {};
  _self.paginator.numberOfPages = _self.paginator.numberOfPages || 5;
  _self.paginator.firstLast = _self.paginator.firstLast || true;
  _self.paginator.prevNext = _self.paginator.prevNext || true;
  _self.paginator.classWhenActive = _self.paginator.classWhenActived || 'active';
  _self.paginator.classWhenDisabled = _self.paginator.classWhenDisabled || 'disabled';
  _self.pagination = {
    currentPage: 0,
    totalPages: 0
  };
  _self.sorting =  obj.sorting || {};
  _self.sorting.ascClass = _self.sorting.ascClass || 'tabling-sort-asc';
  _self.sorting.descClass = _self.sorting.descClass || 'tabling-sort-desc';
  _self.sorting.noneClass = _self.sorting.noneClass || 'tabling-sort-none';
  _self.dataSort = [];

  _self.listeners = [];

  _self.prepareDataFilter = function () {
    return {};
  };

  _self.requestHandler = function (obj) {
  };

  _self.paginationHandler = function (page) {
  };

  _self.sortingHandler = function (sort) {
  };

  _self.table = document.getElementById(_self.elementId);
  if (! _self.table) {
    throw new Error('Does not exists element with this ID.');
  }
  _self.line = self.table.querySelector('*[line]'); // should be a TR
  _self.lineParent = _self.line.parentNode;

  _self.flush = function () {
    _self.lineParent.innerHTML = '';
  };

  _self.handleEvent = function (e) {
    for (var i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i].e == e.type) {
        listeners[i].c(e.target, e);
      }
    }
  };

  _self.request = function () {
    var myRequest = new XMLHttpRequest();

    myRequest.open('POST', _self.endingpointUrl, true);
    myRequest.setRequestHeader('Content-type', 'application/json');

    myRequest.onreadystatechange = function () {
      if (myRequest.readyState == 4 && myRequest.status == 200) {
        _self.requestHandler(JSON.parse(myRequest.responseText));
      }
    }

    myRequest.send(JSON.stringify(_self.prepareDataFilter()));
  };

  _self.addLine = function (obj) {
    var newLine = _self.line.cloneNode(true);

    Object.keys(obj).map(function (key) {
      var col = newLine.querySelector('*[column-id=' + key + ']');
      if (col !== null) {
        col.innerHTML = obj[key];
      }
    });

    var ms = '';
    for (var i = 0; i < newLine.children.length; i++) {
      var c = newLine.children[i];
      while (ms = c.innerHTML.match(/%([a-zA-Z0-9-_]+)%/)) {
        var col = newLine.querySelector('*[column-id=' + ms[1] + ']');
        if (col !== null) {
          c.innerHTML = c.innerHTML.replace(ms[0], col.innerHTML);
        } else {
          c.innerHTML = c.innerHTML.replace(ms[0], '');
        }
      }
    }

    _self.lineParent.append(newLine);
  };

  _self.addLines = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      table.addLine(arr[i]);
    }
  };

  _self.on = function (event, clousure) {
    if (typeof clousure !== 'function') {
      throw new Error('It is not a funcitons');
    }
    _self.listeners.push({e: event, c: clousure});
  };

  _self.updatePagination = function () {
    var lasts = _self.pageParent.querySelectorAll('*[dinamic-page]');
    for (var i = lasts.length - 1; i >= 0; i--) {
      lasts[i].remove();
    }

    var afterCenter = Math.floor(_self.paginator.numberOfPages / 2);
    center = _self.paginator.numberOfPages % 2 !== 0 ? afterCenter + 1 : afterCenter;
    var start = 1;

    if (_self.pagination.currentPage > center) {
      if (_self.pagination.currentPage - afterCenter + _self.paginator.numberOfPages - 1 > _self.pagination.totalPages) {
        start = _self.pagination.totalPages - _self.paginator.numberOfPages + 1;
      } else {
        start = _self.pagination.currentPage - afterCenter;
      }
    }

    if (_self.paginator.firstLast) {
      var first = _self.pageParent.querySelector('*[first-page]');
      if (_self.pagination.currentPage == 1) {
        first.classList.add(_self.paginator.classWhenDisabled);
      } else {
        first.classList.remove(_self.paginator.classWhenDisabled);
      }
      var last = _self.pageParent.querySelector('*[last-page]');
      if (_self.pagination.currentPage == _self.pagination.totalPages) {
        last.classList.add(_self.paginator.classWhenDisabled);
      } else {
        last.classList.remove(_self.paginator.classWhenDisabled);
      }
    }

    if (_self.paginator.prevNext) {
      var prev = _self.pageParent.querySelector('*[prev-page]');
      if (_self.pagination.currentPage - 1 < 1) {
        prev.classList.add(_self.paginator.classWhenDisabled);
      } else {
        prev.classList.remove(_self.paginator.classWhenDisabled);
      }
      var next = _self.pageParent.querySelector('*[next-page]');
      if (_self.pagination.currentPage + 1 > _self.pagination.totalPages) {
        next.classList.add(_self.paginator.classWhenDisabled);
      } else {
        next.classList.remove(_self.paginator.classWhenDisabled);
      }
    }

    for (var i = start; i < start + _self.paginator.numberOfPages; i++) {
      (function () {
        var page = _self.pageClone.cloneNode(true);
        page.setAttribute('dinamic-page', 'true');
        if (i > _self.pagination.totalPages) {
          page.innerHTML = page.innerHTML.replace('%page%', '-');
          page.classList.add(_self.paginator.classWhenDisabled);
        } else {
          page.innerHTML = page.innerHTML.replace('%page%', i);
          if (i == _self.pagination.currentPage) {
            page.classList.add(_self.paginator.classWhenActive);
          }
          var dinamicPage = i;
          page.addEventListener('click', function () {_self.paginate(dinamicPage)});
        }
        _self.pageParent.insertBefore(page, _self.page);
      })();
    }
  };

  _self.paginate = function (page) {
    var goTo = _self.pagination.currentPage;

    switch (page) {
      case 'first' :
        goTo = 1
        break;
      case 'last' :
        goTo = _self.pagination.totalPages
        break;
      case 'next' :
        goTo = ++goTo;
        break;
      case 'prev' :
        goTo = --goTo;
        break;
      default :
        goTo = page;
        break;
    }

    if (goTo > 0 && goTo <= _self.pagination.totalPages) {
      _self.paginationHandler(goTo);
    }
  };

  _self.doSort = function (el) {
    var sortDirection = el.getAttribute('sort-direction');
    var col = el.getAttribute('column-id');

    if (col != null && col != '') {
      var id = null;
      Object.keys(_self.dataSort).map(function (key) {
        if (_self.dataSort[key].column == col) {
          id = key;
        }
      });

      if (id == null) {
        _self.dataSort.push({column: col, direction: 'asc'});
        id = _self.dataSort.length - 1;
      }

      if (sortDirection == '' || sortDirection == null) {
        el.setAttribute('sort-direction', 'asc');
        el.classList.remove(_self.sorting.noneClass);
        el.classList.remove(_self.sorting.descClass);

        el.classList.add(_self.sorting.ascClass);
        _self.dataSort[id].direction = 'asc';
      } else if (sortDirection == 'asc') {
        el.setAttribute('sort-direction', 'desc');
        el.classList.remove(_self.sorting.noneClass);
        el.classList.remove(_self.sorting.ascClass);

        el.classList.add(_self.sorting.descClass);
        _self.dataSort[id].direction = 'desc';
      } else {
        el.setAttribute('sort-direction', '');
        el.classList.remove(_self.sorting.descClass);
        el.classList.remove(_self.sorting.ascClass);

        el.classList.add(_self.sorting.noneClass);
        _self.dataSort.splice(id, 1);
      }
    }

    _self.sortingHandler(_self.dataSort);
  };

  (function () {
    _self.flush();
    var elements = _self.table.querySelectorAll('*[handle-event]');
    for (var i = elements.length - 1; i >= 0; i--) {
      var element = elements[i];
      var elementEvents = element.getAttribute('handle-event');
      if (elementEvents === '') {
        for(var key in element){
          if(key.search('on') === 0) {
            element.addEventListener(key.slice(2), _self.handleEvent);
          }
        }
      } else {
        elementEvents.split(',').map(function (event) {
          element.addEventListener(event, _self.handleEvent);
        });
      }
    }

    var elements = _self.table.querySelectorAll('*[sortable]');
    for (var i = elements.length - 1; i >= 0; i--) {
      var element = elements[i];
      element.classList.add(_self.sorting.noneClass);
      element.addEventListener('click', function (e) {_self.doSort(e.target);});
    }

    if (_self.paginator.firstLast) {
      var first = _self.table.querySelector('*[first-page]');
      first.addEventListener('click', function () {_self.paginate('first')});
      var last = _self.table.querySelector('*[last-page]');
      last.addEventListener('click', function () {_self.paginate('last')});
    }

    if (_self.paginator.prevNext) {
      var prev = _self.table.querySelector('*[prev-page]');
      prev.addEventListener('click', function () {_self.paginate('prev')});
      var next = _self.table.querySelector('*[next-page]');
      next.addEventListener('click', function () {_self.paginate('next')});
    }

    _self.page = _self.table.querySelector('*[page]');
    _self.pageClone = _self.page.cloneNode(true);
    _self.page.style.display = 'none';
    _self.pageParent = _self.page.parentNode;
  })();

  return {
    on : _self.on,
    flush : _self.flush,
    addLine : _self.addLine,
    addLines : _self.addLines,
    request : _self.request,
    setPagination : function (pagination) {
      _self.pagination = pagination;
      _self.updatePagination();
    },
    setPaginationHandler : function (fnc) {
      _self.paginationHandler = fnc;
    },
    setRequestHandler : function (fnc) {
      _self.requestHandler = fnc;
    },
    setSortingHandler : function (fnc) {
      _self.sortingHandler = fnc;
    },
    setPrepareDataFilter : function (fnc) {
      _self.prepareDataFilter = fnc;
    },
    init: function () {
      _self.request();
    }
  };
};

(function () {
  var css = document.createElement('style');
  css.innerHTML = '.tabling-sort-none::{content: "";}.tabling-sort-asc::after{content:" \\2193"}.tabling-sort-desc::after{content:" \\2191"}';

  var cs = document.currentScript;
  cs.parentNode.insertBefore(css, cs);
})();
