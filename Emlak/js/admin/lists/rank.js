/* Puanlama List */

var formopencount = 1;
$(document).ready(function () {

    if ($("#RankTableContainer").length > 0) {
        $("#RankTableContainer").jtable({
            title: "Ziyaretler", //Puanlamalar olacak orijinalde
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'ID ASC',
            ajaxSettings: {
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
            },
            actions: {
                listAction: ProjectPath + "/Ajax/Rank/List",
                //updateAction: ProjectPath + "/Ajax/Rank/Update", //burayı ekle orijinalde
                deleteAction: ProjectPath + "/Ajax/Rank/Delete"
            },
            fields: {
                ID: {
                    title: "ID",
                    width: "40px",
                    key: true,
                    create: false,
                    edit: false,
                },
                RankName: {
                    title: "IP Adres", //bura değeşecek orijinalde Puanlama İsmi
                    width: "200px",
                },
                Code: {
                    title: "Ziyaret Tarihi", //bura değeşecek orijinalde Kod
                    width: "100px",
                },
                MaxRankPoint: {
                    title: "Maks. Puan",
                    width: "100px",
                    list: false, //burayı kaldır orijinalde
                },
                Active: {
                    title: "Aktif mi?",
                    width: "100px",
                    type: "checkbox",
                    list: false, //burayı kaldır orijinalde
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                }
                //,RankPointField: { //burayı ekle orijinalde
                //    title: "",
                //    width: '20px',
                //    sorting: true,
                //    paging: true,
                //    pageSize: 10,
                //    edit: false,
                //    create: false,
                //    list: false, //burayı kaldır orijinalde
                //    listClass: 'child-opener-image-column',
                //    display: function (rankData) {
                //        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                //        $img.click(function () {
                //            $('#RankTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Puanlar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/Rank/ListPoint?rankID=" + rankData.record.ID,
                //                        updateAction: ProjectPath + "/Ajax/Rank/UpdatePoint?rankID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/Rank/DeletePoint?rankID=" + rankData.record.ID,
                //                    },
                //                    fields: {
                //                        ID: {
                //                            title: "ID",
                //                            key: true,
                //                            create: false,
                //                            list: false
                //                        },
                //                        RankID: {
                //                            title: "Puanlama ID",
                //                            create: false,
                //                            list: false
                //                        },
                //                        RankPoint: {
                //                            title: "Puan",
                //                            width: "100px",
                //                            create: false
                //                        },
                //                        IPAddress: {
                //                            title: "IP Adres",
                //                            create: false,
                //                            list: false
                //                        },
                //                        Sender: {
                //                            title: "Puanı Veren",
                //                            width: "300px",
                //                            create: false
                //                        },
                //                        SendDate: {
                //                            title: "Puanlama Tarihi",
                //                            width: "200px",
                //                            create: false
                //                        },
                //                        Subject: {
                //                            title: "Başlık",
                //                            width: "300px",
                //                            create: false
                //                        },
                //                        Message: {
                //                            title: "Mesaj",
                //                            type: "textarea",
                //                            list: false,
                //                            create: false
                //                        },
                //                        Active: {
                //                            title: "Aktif mi?",
                //                            width: "100px",
                //                            type: "checkbox",
                //                            values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                //                            defaultValue: "true"
                //                        }
                //                    },
                //                    formCreated: function (event, data) {
                //                        $("input[type='text']").each(function () {
                //                            $(this).attr("disabled", "disabled");
                //                        });
                //                        $('textarea').each(function () {
                //                            $(this).attr("disabled", "disabled");
                //                        });
                //                    },
                //                    formSubmitting: function (event, data) {
                //                        $("input[type='text']").each(function () {
                //                            $(this).removeAttr("disabled");
                //                        });
                //                        $('textarea').each(function () {
                //                            $(this).removeAttr("disabled");
                //                        });
                //                        $('textarea').each(function () {
                //                            $(this).attr("id", "Edit-" + $(this).attr("data-id"));
                //                            $(this).attr("name", $(this).attr("data-id"));
                //                        });
                //                    },
                //                }, function (data) {
                //                    data.childTable.jtable('load');
                //                });
                //        });
                //        return $img;
                //    }
                //}
            }
        });

        //$('#RankTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#RankTableContainer').jtable('load', {
                rankName: $('#rankName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Puanlama List */
