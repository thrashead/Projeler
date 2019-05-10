/* Resimler (Dilsiz) */

var formopencount = 1;
var kon = true;
$(document).ready(function () {

    if ($("#PicturesNoLangTableContainer").length > 0) {
        $("#PicturesNoLangTableContainer").jtable({
            title: "Resimler (Dilsiz)",
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
                listAction: ProjectPath + "/Ajax/PicturesNoLang/List",
                createAction: ProjectPath + "/Ajax/PicturesNoLang/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/PicturesNoLang/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/PicturesNoLang/Delete"
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı İçerikler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListContent?picID=" + contData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteContent?picID=" + contData.record.ID
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListFiles?picID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteFiles?picID=" + fileData.record.ID
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListFilesNoLang?picID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteFilesNoLang?picID=" + fileData.record.ID
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Galeriler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListGallery?picID=" + galData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteGallery?picID=" + galData.record.ID
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
                Pictures: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (picData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/picturelist.png" title="Bağlı Resimler" />');
                        $img.click(function () {
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListPictures?picID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeletePictures?picID=" + picData.record.ID
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
                                            title: "Örnek Resim",
                                            width: "100px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (picData) {
                                                return picData.record.Sample == "" ? '<center style="color:Red;">Resim Eklenmemiş</center>' : '<center><img width="50" height="50" src="' + UploadPath + "/Gallery/" + picData.record.Sample + '" /></center>';
                                            }
                                        },
                                        PictureName: {
                                            title: "İçerik Adı",
                                            width: "450px",
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListURLink?picID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteURLink?picID=" + linkData.record.ID
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
                            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListURLinkNoLang?picID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteURLinkNoLang?picID=" + linkData.record.ID
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
                //            $('#PicturesNoLangTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Bağlı Puanlamalar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/PicturesNoLang/ListRank?picID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/PicturesNoLang/DeleteRank?picID=" + rankData.record.ID
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
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                Code: {
                    title: "Kod",
                    width: "235px"
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
            }
        });

        //$('#PicturesNoLangTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#PicturesNoLangTableContainer').jtable('load', {
                pictureName: $('#pictureName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Resimler (Dilsiz) */
