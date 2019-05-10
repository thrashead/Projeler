/* Resimler */

var formopencount = 1;
var kon = true;
$(document).ready(function () {

    if ($("#PicturesTableContainer").length > 0) {
        $("#PicturesTableContainer").jtable({
            title: "Resimler",
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
                listAction: ProjectPath + "/Ajax/Pictures/List",
                createAction: ProjectPath + "/Ajax/Pictures/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/Pictures/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/Pictures/Delete"
            },
            fields: {
                Contents: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (contData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/contentlist.png" title="Bağlı İçerikler" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı İçerikler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListContent?picID=" + contData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteContent?picID=" + contData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        ContentName: {
                                            title: "İçerik Adı",
                                            width: "250px",
                                            create: false,
                                            edit: false,
                                        },
                                        Sample: {
                                            title: "Örnek Metin",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (contData) {
                                                return contData.record.Sample;
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                Files: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (fileData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/fileslist.png" title="Bağlı Dosyalar" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListFiles?picID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteFiles?picID=" + fileData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        Sample: {
                                            title: "Örnek Dosya",
                                            width: "100px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (fileData) {
                                                return fileData.record.Sample == "" ? '<center style="color:Red;">Dosya Eklenmemiş</center>' : '<center><a target="_blank" href="' + UploadPath + '/File/' + fileData.record.Sample + '">' + fileData.record.Sample + '</a></center>';
                                            }
                                        },
                                        FileName: {
                                            title: "Dosya Adı",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                FilesNoLang: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (fileData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/filesnolanglist.png" title="Bağlı Dosyalar (Dilsiz)" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListFilesNoLang?picID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteFilesNoLang?picID=" + fileData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        FileName: {
                                            title: "Dosya",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (fileData) {
                                                return fileData.record.FileName == "" ? '<font style="color:Red;">Dosya Eklenmemiş</font>' : '<a target="_blank" href="' + UploadPath + '/File/' + fileData.record.FileName + '">' + fileData.record.FileName + '</a>';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                Gallery: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (galData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/gallerylist.png" title="Bağlı Galeriler" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Galeriler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListGallery?picID=" + galData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteGallery?picID=" + galData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        GalleryName: {
                                            title: "Galeri Adı",
                                            width: "250px",
                                            create: false,
                                            edit: false,
                                        },
                                        Sample: {
                                            title: "Örnek Metin",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (galData) {
                                                return galData.record.Sample;
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                PicturesNoLang: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (picData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/picturenolanglist.png" title="Bağlı Resimler (Dilsiz)" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListPicturesNoLang?picID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeletePicturesNoLang?picID=" + picData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        PictureName: {
                                            title: "Resim",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (picData) {
                                                return picData.record.PictureName == "" ? '<font style="color:Red;">Resim Eklenmemiş</font>' : '<img width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + picData.record.PictureName + '" />';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                URLink: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (linkData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/urlinklist.png" title="Bağlı Linkler" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListURLink?picID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteURLink?picID=" + linkData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        URLinkName: {
                                            title: "Link Adı",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                URLinkNoLang: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (linkData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/urlinknolanglist.png" title="Bağlı Linkler (Dilsiz)" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListURLinkNoLang?picID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteURLinkNoLang?picID=" + linkData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        URL: {
                                            title: "Link",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (data) {
                                                return '<a target="_blank" href="' + data.record.URL + '">' + data.record.URL + '</a>';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                //Rank: {
                //    title: "",
                //    width: '15px',
                //    sorting: false,
                //    edit: false,
                //    create: false,
                //    listClass: 'child-opener-image-column',
                //    display: function (rankData) {
                //        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/ranklist.png" title="Bağlı Puanlamalar" />');
                //        $img.click(function () {
                //            $('#PicturesTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Bağlı Puanlamalar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/Pictures/ListRank?picID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteRank?picID=" + rankData.record.ID
                //                    },
                //                    fields: {
                //                        ID: {
                //                            title: "ID",
                //                            key: true,
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        },
                //                        RankName: {
                //                            title: "Puanlama Adı",
                //                            width: "350px",
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        },
                //                        Code: {
                //                            title: "Kod",
                //                            width: "300px",
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        }
                //                    }
                //                }, function (data) {
                //                    data.childTable.jtable('load');
                //                });
                //        });
                //        return $img;
                //    }
                //},
                ID: {
                    title: "ID",
                    width: "40px",
                    key: true,
                    create: false,
                    edit: false
                },
                PictureName: {
                    title: "Resim İsmi (Genel)",
                    width: "350px"
                },
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                Code: {
                    title: "Kod",
                    width: "235px"
                },
                Active: {
                    title: "Aktif mi?",
                    width: "100px",
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
                    display: function (picData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" data-cmd="lang' + picData.record.ID + '" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                        $img.click(function () {
                            $('#PicturesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Dil İçerikleri (İçerik)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8"
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Pictures/ListLang?picID=" + picData.record.ID,
                                        createAction: ProjectPath + "/Ajax/Pictures/InsertLang?picID=" + +picData.record.ID,
                                        updateAction: ProjectPath + "/Ajax/Pictures/UpdateLang?picID=" + +picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Pictures/DeleteLang"
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        PictureID: {
                                            title: "Resim ID",
                                            width: "20px",
                                            edit: false,
                                            create: false,
                                            list: false
                                        },
                                        PictureName: {
                                            title: "Resim",
                                            list: true,
                                            create: true,
                                            edit: true,
                                            input: function (data) {
                                                if (data.record)
                                                    return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:12px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Resmi Yükle</a><input type="text" id="Edit-PictureName" name="PictureName" style="display:none;" value="' + data.record.PictureName + '" />\t<img style="margin-left: 5px;" id="image" width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + data.record.PictureName + '" /><input type="hidden" id="hiddenpics" />';
                                                else
                                                    return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:12px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Resmi Yükle</a><input type="text" id="Edit-PictureName" name="PictureName" style="display:none;" />\t<img id="image" width="50" height="50" style="display:none; margin-left: 5px;" /><input type="hidden" id="hiddenpics" />';
                                            },
                                            display: function (data) {
                                                return '<img id="imageinlist" width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + data.record.PictureName + '" />';
                                            }
                                        },
                                        Language: {
                                            title: "Dil",
                                            width: "50px",
                                            width: "0%",
                                            options: ProjectPath + "/Ajax/CommonData/GetLanguages"
                                        },
                                        ShortText: {
                                            title: "Kısa Açıklama",
                                            list: false
                                        },
                                        Description: {
                                            title: "Uzun Açıklama",
                                            type: "textarea",
                                            inputClass: "ckeditor",
                                            list: false
                                        }
                                    },
                                    formCreated: function (event, data) {
                                        kon = true;
                                        $('textarea.ckeditor').ckeditor(
                                         {
                                             enterMode: Number(2),
                                             width: "600px",
                                             height: "300px",
                                             contentsLanguage: "tr",
                                             skin: "office2003"
                                         });
                                        formopencount++;

                                        $("#hiddenpics").val($("#Edit-PictureName").val() + ",");

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
                                                $("#Edit-PictureName").val(dataObj.data.replace("\"", "").replace("\"", ""));
                                                $("#hiddenpics").val($("#hiddenpics").val() + dataObj.data.replace("\"", "").replace("\"", "") + ",");
                                            }
                                        });
                                    },
                                    formSubmitting: function (event, data) {
                                        kon = false;
                                        $('textarea.ckeditor').each(function () {
                                            $(this).attr("id", "Edit-" + $(this).attr("data-id"));
                                            $(this).attr("name", $(this).attr("data-id"));
                                        });
                                        var tpInfo = new Object();
                                        tpInfo.TempPic = $("#hiddenpics").val().replace($("#Edit-PictureName").val() + ",", "");
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
                                    },
                                    recordAdded: function (event, data) {
                                        $(".jtable-command-button.jtable-edit-command-button[data-cmd='lang" + data.record.PictureID + "']").click();
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

        //$('#PicturesTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#PicturesTableContainer').jtable('load', {
                pictureName: $('#pictureName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Resimler */
