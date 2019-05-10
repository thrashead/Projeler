/* Dosyalar */

var formopencount = 1;
var kon = true;
$(document).ready(function () {

    if ($("#FilesTableContainer").length > 0) {
        $("#FilesTableContainer").jtable({
            title: "Dosyalar",
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
                listAction: ProjectPath + "/Ajax/Files/List",
                createAction: ProjectPath + "/Ajax/Files/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/Files/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/Files/Delete"
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı İçerikler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListContent?fileID=" + contData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteContent?fileID=" + contData.record.ID
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListFilesNoLang?fileID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteFilesNoLang?fileID=" + fileData.record.ID
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Galeriler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListGallery?fileID=" + galData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteGallery?fileID=" + galData.record.ID
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListPictures?fileID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeletePictures?fileID=" + picData.record.ID
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
                                                return picData.record.Sample == "" ? '<center style="color:Red;">Resim Eklenmemiş</center>' : '<center><img width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + picData.record.Sample + '" /></center>';
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListPicturesNoLang?fileID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeletePicturesNoLang?fileID=" + picData.record.ID
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListURLink?fileID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteURLink?fileID=" + linkData.record.ID
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
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListURLinkNoLang?fileID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteURLinkNoLang?fileID=" + linkData.record.ID
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
                //            $('#FilesTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Bağlı Puanlamalar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/Files/ListRank?fileID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/Files/DeleteRank?fileID=" + rankData.record.ID
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
                FileName: {
                    title: "Dosya İsmi (Genel)",
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
                    display: function (fileData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" data-cmd="lang' + fileData.record.ID + '" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                        $img.click(function () {
                            $('#FilesTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Dil İçerikleri (İçerik)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8"
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Files/ListLang?fileID=" + fileData.record.ID,
                                        createAction: ProjectPath + "/Ajax/Files/InsertLang?fileID=" + +fileData.record.ID,
                                        updateAction: ProjectPath + "/Ajax/Files/UpdateLang?fileID=" + +fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Files/DeleteLang"
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        FileID: {
                                            title: "Dosya ID",
                                            width: "20px",
                                            edit: false,
                                            create: false,
                                            list: false
                                        },
                                        FileName: {
                                            title: "Dosya İsmi",
                                            width: "500px",
                                            list: true,
                                            create: true,
                                            edit: true,
                                            input: function (data) {
                                                if (data.record)
                                                    return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:11px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Dosyayı Yükle</a><input type="text" id="Edit-FileName" name="FileName" style="display:none;" value="' + data.record.FileName + '" />\t<span id="span" width="50" height="50" style="margin-left: 5px;color:Red;">' + data.record.FileName + '</span><input type="hidden" id="hiddenfiles" />';
                                                else
                                                    return '<input id="file_upload" name="file_upload" type="file" /><a style="font-size:11px; margin-left:5px;" href="javascript:$(\'#file_upload\').uploadify(\'upload\')">Seçilen Dosyayı Yükle</a><input type="text" id="Edit-FileName" name="FileName" style="display:none;" />\t<span id="span" width="50" height="50" style="display:none; margin-left: 5px;color:Red;"></span><input type="hidden" id="hiddenfiles" />';
                                            },
                                            display: function (data) {
                                                return '<a target="_blank" href="' + UploadPath + "/File/" + data.record.FileName + '">' + data.record.FileName + '</a>';
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

                                        $("#hiddenfiles").val($("#Edit-FileName").val() + ",");

                                        $('#file_upload').uploadify({
                                            'multi': false,
                                            'auto': false,
                                            'sizeLimit': '525000',
                                            'buttonImage': ImagePath + '/uploadifybtn.png',
                                            'buttonClass': 'uploadifybtn',
                                            'fileTypeExts': '*.doc; *.docx; *.xls; *.xlsx; *.ppt; *.pptx; *.pps; *.ppsx; *.pdf; *.txt; *.xml; *.avi; *.mp4; *.wmv; *.mpg; *.mpeg; *.mp3',
                                            'swf': ScriptPath + '/uploadify.swf',
                                            'uploader': ProjectPath + '/Ajax/Common/UploadFile',
                                            'onUploadSuccess': function (file, data, response) {
                                                var dataObj = JSON.parse(data);
                                                $("#span").html(dataObj.data.replace("\"", "").replace("\"", ""));
                                                $("#span").fadeIn("slow");
                                                $("#Edit-FileName").val(dataObj.data.replace("\"", "").replace("\"", ""));
                                                $("#hiddenfiles").val($("#hiddenfiles").val() + dataObj.data.replace("\"", "").replace("\"", "") + ",");
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
                                        tpInfo.TempFile = $("#hiddenfiles").val().replace($("#Edit-FileName").val() + ",", "");
                                        $.ajax({
                                            type: 'POST',
                                            url: ProjectPath + '/Ajax/Common/DeleteTempFiles',
                                            data: "{tempFiles: '" + JSON.stringify(tpInfo) + "' }",
                                            dataType: "json",
                                            contentType: "application/json; charset=utf-8"
                                        });
                                    },
                                    formClosed: function (event, data) {
                                        if (kon == true) {
                                            var tpInfo = new Object();
                                            tpInfo.TempFile = $("#hiddenfiles").val().replace($("#hiddenfiles").val().split(',')[0] + ",", "");
                                            $.ajax({
                                                type: 'POST',
                                                url: ProjectPath + '/Ajax/Common/DeleteTempFiles',
                                                data: "{tempFiles: '" + JSON.stringify(tpInfo) + "' }",
                                                dataType: "json",
                                                contentType: "application/json; charset=utf-8"
                                            });
                                        }
                                    },
                                    formCancelled: function (event, data) {
                                        if (kon == true) {
                                            var tpInfo = new Object();
                                            tpInfo.TempFile = $("#hiddenfiles").val().replace($("#hiddenfiles").val().split(',')[0] + ",", "");
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
                                        $(".jtable-command-button.jtable-edit-command-button[data-cmd='lang" + data.record.FileID + "']").click();
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

        //$('#FilesTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#FilesTableContainer').jtable('load', {
                fileName: $('#fileName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* Dosyalar */
