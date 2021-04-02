$('document').ready(() => {
    $('form').find('input[type=number]').change((e) => {
        if ($(e.target).val() > 255) $(e.target).val(255);
        else if ($(e.target).val() < 0) $(e.target).val(0);
    });
});