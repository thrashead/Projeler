/* LinkNoLang List */

var formopencount = 1;
$(document).ready(function () {

    if ($("#URLinkNoLangTableContainer").length > 0) {
        $("#URLinkNoLangTableContainer").jtable({
            title: "Linkler",
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'ID ASC',
            actions: {
                listAction: ProjectPath + "/Ajax/URLinkNoLang/List",
                createAction: ProjectPath + "/Ajax/URLinkNoLang/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/URLinkNoLang/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/URLinkNoLang/Delete"
            },
            fields: {
                ID: {
                    title: "ID",
                    width: "20px",
                    key: true,
                    create: false,
                    edit: false
                },
                URL: {
                    title: "Link",
                    width: "150px",
                    display: function (data) {
                        return '<a target="_blank" href="' + data.record.URL + '">' + data.record.URL + '</a>';
                    }
                },
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                Code: {
                    title: "Kod",
                    width: "110px"
                },
                Target: {
                    title: "Hedef",
                    width: "70px",
                    options: ProjectPath + "/Ajax/CommonData/GetLinkTarget"
                },
                Active: {
                    title: "Aktif mi?",
                    width: "50px",
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true"
                },
                AlternateText: {
                    title: "Alternatif Açıklama",
                    list: false
                }
            }
        });

        //$('#URLinkNoLangTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#URLinkNoLangTableContainer').jtable('load', {
                urlinkName: $('#urlinkName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* LinkNoLang List */
