$('#createTab').click(() => {
    $('#listContent').css('cssText', 'display: none !important');
    $('#createContent').css('cssText', 'display: block !important');
});

$('#listTab').click(() => {
    $('#listContent').css('cssText', 'display: flex !important');
    $('#createContent').css('cssText', 'display: none !important');
});