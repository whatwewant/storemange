var prefix = '/api/v1/admin';

$(function () {
    
    $(".user table .retrieve").click(function (e) {
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'get',
            crossDomain: true,
            // dataType: 'jsonp',
            // jsonp: 'callback',
        })
        .done(function (user) {
           $("#retrieveModal table tbody").html(
            `
            <tr><td>昵&emsp;称</td><td>${user.nickname}</td></tr>
            <tr><td>用户名</td><td>${user.username}</td></tr>
            <tr><td>OpenID</td><td>${user.openid}</td></tr>
            <tr><td>联&emsp;系</td><td>${user.phone}</td></tr>
            <tr><td>创建时间</td><td>${user.createdAt}</td></tr>
            <tr><td>更新时间</td><td>${user.updatedAt}</td></tr>
            `
            );

            $("#retrieveModal").modal("show");
        });
    });

    $(".user table .update").click(function (e) {
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'get',
            crossDomain: true,
        }).done(function (user) {
           $('#updateModal [name="user[nickname]"]').val(user.nickname); 
           $('#updateModal [name="user[username]"]').val(user.username).attr('disabled', 'disabled');
           $('#updateModal [name="user[openid]"]').val(user.openid);
           $('#updateModal [name="user[phone]"]').val(user.phone);
           $('#updateModal [name="update"]').data("id", user._id);
         
           $("#updateModal").modal("show");
        });
    });

    $('.user #updateModal [name="update"]').click(function (e) {
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'put',
            data: $('#updateModal form').serialize(),
            crossDomain: true,
        })
        .done(function (user) {
            $("#updateModal").modal("hide");  
        });
    });

    $(".user table .del").click(function (e) {
        var self = this;
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'delete',
            crossDomain: true,
        })
        .done(function (user) {
            $(self).parent().parent().remove();
        });
    });

    $(".user table .set-status").click(function (e) {
        var self = this;
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'put',
            crossDomain: true,
            data: 'user[status][active]=' + ! $(this).data('status'),
        }).done(function (user) {
            $(self).data('status', user.status.active);
            $(self).html(user.status.active ? '活跃': '离职');
            // window.aa = $(self);
            var setStatus = $(self).parent().parent().find('.update');
            if (user.status.active) {
                setStatus.removeAttr("disabled");
                $(self).removeClass('btn-danger');
                $(self).addClass('btn-primary');
            }
            else {
                setStatus.attr("disabled", "disabled");
                $(self).removeClass('btn-primary');
                $(self).addClass('btn-danger');
            }
        });
    });
});


$(function () {
    $('.store .btn.update').click(function (e) {
        $.ajax({
            url: prefix + '/store/' + $(this).data('id'),
            type: 'get',
            crossDomain: true,
        }).done(function (store) {
            var main = '#updateModal';

            $(main + ' [name="store[name]"]').val(store.name);
            $(main + ' [name="store[total]"]').val(store.total).attr('disabled', 'disabled');
            $(main + ' [name="store[belongsTo]"]').val(store.belongsTo ? store.belongsTo._id : '已离职');
            $(main + ' [name="store[manipulator]"]').val(store.manipulator ? store.manipulator._id : '已离职');
            $(main + ' [name="store[comment]"]').val(store.comment);

            $('.store #updateModal .update-btn').data('id', store._id);
            $(main).modal('show');
        }).fail(function (err, code) {
            alert('failed');
        });
    });

    $('.store #updateModal .update-btn').click(function (e) {
        $.ajax({
            url: prefix + '/store/' + $(this).data('id'),
            type: 'put',
            crossDomain: true,
            data: $('.store #updateModal form').serialize(),
        }).done(function (data) {
            // var item = '.item-id-' + data._id;
            $('#updateModal').modal('hide');
        });
    });

    $('.store .btn.del').click(function (e) {
        var self = this;
        $.ajax({
            url: prefix + '/store/' + $(this).data('id'),
            type: 'delete',
            crossDomain: true,
        })
        .done(function (user) {
            $(self).parent().parent().remove();
        })
        .fail(function (err, code) {
            alert(err);
        });
    });

    $('.store .btn.add').click(function (e) {
        var id = $(this).data('id');
        var name = $(this).data('name');

        $('.store #addModal .add-btn').data('id', id);
        $('.store #addModal .modal-title').html('新增 ' + name);
        $('.store #addModal').modal('show');
    })

    $('.store #addModal .add-btn').click(function (e) {
        $.ajax({
            url: prefix + '/store/' + $(this).data('id'),
            type: 'put',
            crossDomain: true,
            data: $('#addModal form').serialize(),
        }).done(function (data) {
            $('.store #addModal').modal('hide');
        }).fail(function (err, code) {
            alert('failed');
        });
    });
});
