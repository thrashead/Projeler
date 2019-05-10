$(document).ready(function () {
    if ($("body").width() <= 482) {
        CKEDITOR.replace('aboutus', {
            height: "200px",
            toolbar: [
                ['Source', 'Bold', 'Italic', 'Underline', 'StrikeThrough'], ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
                ['Font'], ['FontSize']
            ]
        });
    }
    else {
        CKEDITOR.replace('aboutus',
        {
            enterMode: Number(2),
            width: "100%",
            height: "500px",
            contentsLanguage: "tr",
            skin: "office2003"
        });
    }
});