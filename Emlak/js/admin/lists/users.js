/* Kullanıcılar */

var formopencount = 1;
$(document).ready(function () {

    if ($("#UsersTableContainer").length > 0) {
        $("#UsersTableContainer").jtable({
            title: "Kullanıcılar",
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'ID ASC',
            ajaxSettings: {
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            actions: {
                listAction: ProjectPath + "/Ajax/Users/List",
                createAction: ProjectPath + "/Ajax/Users/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/Users/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/Users/Delete"
            },
            fields: {
                ID: {
                    title: "ID",
                    width: "40px",
                    key: true,
                    create: false,
                    edit: false
                },
                Username: {
                    title: "Kullanıcı Adı",
                    width: "110px",
                },
                Password: {
                    title: "Şifre",
                    width: "110px",
                    list: false
                },
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                Active: {
                    title: "Aktif mi?",
                    width: "100px",
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true"
                }
            },
            formCreated: function (event, data) {
                $("#Edit-Password").val("");
            }
        });

        //$('#UsersTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#UsersTableContainer').jtable('load', {
                userName: $('#userName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Kullanıcılar */
