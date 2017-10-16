# Tabling Doc

## Availabe Contructor Properties

#### elementId

The element ID

#### endingpointUrl

The endingpointUrl

#### paginator.numberOfPages

The number of pages to display in the html

#### paginator.firstLast

Show button to first and last page

#### paginator.prevNext

Show button to prev and next page

#### paginator.classWhenActived

CSS class when is actived

#### paginator.classWhenDisabled

CSS class when is disabled

#### sorting.ascClass

CSS class for asc

#### sorting.descClass

CSS class for desc

#### sorting.noneClass

CSS class for none

#### dataSort

Default sort to be sent to the endingpointUrl, i.e

```javascript
dataSort : [
    {}
]
```


## Availabe Methods

#### on(event, callback)

Give the abilit to handle event from any element that have "handle-event" attribute

#### addFormatter(name, callback)

The formatter

#### flush()

Clean the table

#### addLine(object)

Add a new line

#### addLines(array)

Add a array of lines

#### request()

Send the request for the endingpoint

#### hideColumn(columnId)

Hide column

#### showColumn(columnId)

Show column

#### setPagination(paginationObject)

Set the pagination object

#### setPaginationHandler(callback)

Set the pagination handler

#### setResponseHandler(callback)

Set the response handler

#### setSortingHandler(callback)

Set the sorting handler

#### setRequestHandler(callback)

Set the request handler

#### init()

Alias for request
