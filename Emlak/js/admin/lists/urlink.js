/* Link List */

var formopencount = 1;
$(document).ready(function () {

    if ($("#URLinkTableContainer").length > 0) {
        $("#URLinkTableContainer").jtable({
            title: "Linkler",
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'ID ASC',
            actions: {
                listAction: ProjectPath + "/Ajax/URLink/List",
                createAction: ProjectPath + "/Ajax/URLink/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/URLink/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/URLink/Delete"
            },
            fields: {
                ID: {
                    title: "ID",
                    width: "20px",
                    key: true,
                    create: false,
                    edit: false
                },
                URLinkName: {
                    title: "Link İsmi (Genel)",
                    width: "150px"
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
                LangField: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (linkData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" data-cmd="lang' + linkData.record.ID + '" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                        $img.click(function () {
                            $('#URLinkTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Dil İçerikleri (Link)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/URLink/ListLang?linkID=" + linkData.record.ID,
                                        createAction: ProjectPath + "/Ajax/URLink/InsertLang?linkID=" + +linkData.record.ID,
                                        updateAction: ProjectPath + "/Ajax/URLink/UpdateLang?linkID=" + +linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/URLink/DeleteLang"
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        URLinkID: {
                                            title: "Link ID",
                                            width: "20px",
                                            edit: false,
                                            create: false,
                                            list: false
                                        },
                                        URL: {
                                            title: "URL",
                                            width: "550px",
                                            display: function (data) {
                                                return '<a target="_blank" href="' + data.record.URL + '">' + data.record.URL + '</a>';
                                            }
                                        },
                                        Language: {
                                            title: "Dil",
                                            width: "100px",
                                            options: ProjectPath + "/Ajax/CommonData/GetLanguages"
                                        },
                                        AlternateText: {
                                            title: "Alternatif Açıklama",
                                            list: false
                                        }
                                    },
                                    recordAdded: function (event, data) {
                                        $(".jtable-command-button.jtable-edit-command-button[data-cmd='lang" + data.record.URLinkID + "']").click();
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                }
            }
        });

        //$('#URLinkTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#URLinkTableContainer').jtable('load', {
                urlinkName: $('#urlinkName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Link List */
