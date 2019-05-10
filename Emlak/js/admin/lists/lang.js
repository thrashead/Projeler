/* Diller */

var formopencount = 1;
var kon = true;
$(document).ready(function () {

    if ($("#LangTableContainer").length > 0) {
        $("#LangTableContainer").jtable({
            title: "Diller",
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
                listAction: ProjectPath + "/Ajax/Lang/List",
                createAction: ProjectPath + "/Ajax/Lang/Insert",
                updateAction: ProjectPath + "/Ajax/Lang/Update",
                deleteAction: ProjectPath + "/Ajax/Lang/Delete"
            },
            fields: {
                ID: {
                    title: "ID",
                    width: "40px",
                    key: true,
                    create: false,
                    edit: false
                },
                LangName: {
                    title: "Dil",
                    width: "110px"
                },
                ShortName: {
                    title: "Kısaltma",
                    width: "110px"
                },
                FlagImage: {
                    title: "İkon",
                    width: "110px",
                    list: true,
                    create: true,
                    edit: true,
                    input: function (data) {
                        if (data.record)
                            return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:12px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Resmi Yükle</a><input type="text" id="Edit-FlagImage" name="FlagImage" style="display:none;" value="' + data.record.FlagImage + '" />\t<img style="margin-left: 5px;" id="image" width="21" height="14" src="' + UploadPath + "/Gallery/" + data.record.FlagImage + '" /><input type="hidden" id="hiddenpics" />';
                        else
                            return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:12px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Resmi Yükle</a><input type="text" id="Edit-FlagImage" name="FlagImage" style="display:none;" />\t<img id="image" width="21" height="14" style="display:none; margin-left: 5px;" /><input type="hidden" id="hiddenpics" />';
                    },
                    display: function (data) {
                        return '<img id="imageinlist" width="21" height="14" src="' + UploadPath + "/Gallery/" + data.record.FlagImage + '" />';
                    }
                }
            },
            formCreated: function (event, data) {
                formopencount++;

                $("#hiddenpics").val($("#Edit-FlagImage").val() + ",");

                $('#file_upload').uploadify({
                    'multi': false,
                    'auto': false,
                    'sizeLimit': '525000',
                    'buttonImage': ImagePath + '/uploadifybtn.png',
                    'buttonClass': 'uploadifybtn',
                    'fileTypeExts': '*.gif; *.jpg; *.png; *.bmp',
                    'swf': ScriptPath + '/uploadify.swf',
                    'uploader': ProjectPath + '/Ajax/Common/UploadPicture',
                    'onUploadSuccess': function (file, data, response) {
                        var dataObj = JSON.parse(data);
                        $("#image").attr("src", UploadPath + "/Gallery/Thumb/" + dataObj.data.replace("\"", "").replace("\"", ""));
                        $("#image").fadeIn("slow");
                        $("#Edit-FlagImage").val(dataObj.data.replace("\"", "").replace("\"", ""));
                        $("#hiddenpics").val($("#hiddenpics").val() + dataObj.data.replace("\"", "").replace("\"", "") + ",");
                    }
                });
            },
            formSubmitting: function (event, data) {
                kon = false;
                var tpInfo = new Object();
                tpInfo.TempPic = $("#hiddenpics").val().replace($("#Edit-FlagImage").val() + ",", "");
                $.ajax({
                    type: 'POST',
                    url: ProjectPath + '/Ajax/Common/DeleteTempPics',
                    data: "{tempPics: '" + JSON.stringify(tpInfo) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            },
            formClosed: function (event, data) {
                if (kon == true) {
                    var tpInfo = new Object();
                    tpInfo.TempPic = $("#hiddenpics").val().replace($("#hiddenpics").val().split(',')[0] + ",", "");
                    $.ajax({
                        type: 'POST',
                        url: ProjectPath + '/Ajax/Common/DeleteTempPics',
                        data: "{tempPics: '" + JSON.stringify(tpInfo) + "' }",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                }
            },
            formCancelled: function (event, data) {
                if (kon == true) {
                    var tpInfo = new Object();
                    tpInfo.TempPic = $("#hiddenpics").val().replace($("#hiddenpics").val().split(',')[0] + ",", "");
                    $.ajax({
                        type: 'POST',
                        url: ProjectPath + '/Ajax/Common/DeleteTempPics',
                        data: "{tempPics: '" + JSON.stringify(tpInfo) + "' }",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                }
            }
        });

        //$('#LangTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#LangTableContainer').jtable('load', {
                langName: $('#langName').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Diller */
