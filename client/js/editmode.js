let edit = false;

function objectToWidget(o) {
  if(!o.id)
    o.id = Math.random().toString(36).substring(3, 7);
  toServer('add', o);
}

function editClick(e) {
  if(edit) {
    const target = widgets.get(e.target.id);
    const { clientX, clientY } = e.type === "touchend" ? e.changedTouches[0] : e;

    if(target.dragStartEvent.clientX == clientX && target.dragStartEvent.clientY == clientY) {
      $('#editWidgetJSON').dataset.id = e.target.id;
      $('#editWidgetJSON').value = JSON.stringify(target.sourceObject, null, '  ');
      showOverlay('editOverlay');
    }
  }
}

onLoad(function() {
  on('#editButton', 'click', function() {
    if(edit)
      $('body').classList.remove('edit');
    else
      $('body').classList.add('edit');
    edit = !edit;
    showOverlay();
  });

  on('#addWidget', 'click', function() {
    objectToWidget(JSON.parse($('#widgetText').value));
    showOverlay();
  });

  on('#updateWidget', 'click', function() {
    widgets.get($('#editWidgetJSON').dataset.id).sourceObject = JSON.parse($('#editWidgetJSON').value);
    widgets.get($('#editWidgetJSON').dataset.id).sendUpdate();
    showOverlay();
  });

  on('#removeWidget', 'click', function() {
    toServer('remove', $('#editWidgetJSON').dataset.id);
    showOverlay();
  });

  on('#room', 'mouseup',  editClick);
  on('#room', 'touchend', editClick);
});