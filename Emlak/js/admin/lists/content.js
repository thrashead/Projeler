/* İçerik List */

var formopencount = 1;
$(document).ready(function () {

    if ($("#ContentTableContainer").length > 0) {
        $("#ContentTableContainer").jtable({
            title: "İçerikler",
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
                listAction: ProjectPath + "/Ajax/Content/List",
                createAction: ProjectPath + "/Ajax/Content/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/Content/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/Content/Delete"
            },
            fields: {
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListFiles?contID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteFiles?contID=" + fileData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListFilesNoLang?contID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteFilesNoLang?contID=" + fileData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Galeriler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListGallery?contID=" + galData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteGallery?contID=" + galData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListPictures?contID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeletePictures?contID=" + picData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListPicturesNoLang?contID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeletePicturesNoLang?contID=" + picData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListURLink?contID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteURLink?contID=" + linkData.record.ID
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
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListURLinkNoLang?contID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteURLinkNoLang?contID=" + linkData.record.ID
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
                //            $('#ContentTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Bağlı Puanlamalar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/Content/ListRank?contID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/Content/DeleteRank?contID=" + rankData.record.ID
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
                    edit: false,
                },
                ContentName: {
                    title: "İçerik İsmi (Genel)",
                    width: "350px",
                },
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                Code: {
                    title: "Kod",
                    width: "235px",
                },
                Active: {
                    title: "Aktif mi?",
                    width: "100px",
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                LangField: {
                    title: "",
                    width: '20px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (contData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" data-cmd="lang' + contData.record.ID + '" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                        $img.click(function () {
                            $('#ContentTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Dil İçerikleri (İçerik)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/Content/ListLang?contID=" + contData.record.ID,
                                        createAction: ProjectPath + "/Ajax/Content/InsertLang?contID=" + +contData.record.ID,
                                        updateAction: ProjectPath + "/Ajax/Content/UpdateLang?contID=" + +contData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/Content/DeleteLang"
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        ContentID: {
                                            title: "İçerik ID",
                                            width: "20px",
                                            edit: false,
                                            create: false,
                                            list: false
                                        },
                                        ContentName: {
                                            title: "İçerik Başlığı",
                                            width: "550px"
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "100px"
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
                                        $('textarea.ckeditor').ckeditor(
                                        {
                                            enterMode: Number(2),
                                            width: "600px",
                                            height: "300px",
                                            contentsLanguage: "tr",
                                            skin: "office2003"
                                        });
                                        formopencount++;
                                    },
                                    formSubmitting: function (event, data) {
                                        $('textarea.ckeditor').each(function () {
                                            $(this).attr("id", "Edit-" + $(this).attr("data-id"));
                                            $(this).attr("name", $(this).attr("data-id"));
                                        });
                                    },
                                    recordAdded: function (event, data) {
                                        $(".jtable-command-button.jtable-edit-command-button[data-cmd='lang" + data.record.ContentID + "']").click();
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

        //$('#ContentTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#ContentTableContainer').jtable('load', {
                contentName: $('#contentName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

/* İçerik List */
