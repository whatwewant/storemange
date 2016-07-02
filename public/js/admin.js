$(function () {
    var prefix = '/api/v1/admin';
    
    $("table .retrieve").click(function (e) {
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

    $("table .update").click(function (e) {
        $.ajax({
            url: prefix + '/user/' + $(this).data('id'),
            type: 'get',
            crossDomain: true,
        }).done(function (user) {
           $('#updateModal [name="user[nickname]"]').val(user.nickname); 
           $('#updateModal [name="user[username]"]').val(user.username);
           $('#updateModal [name="user[openid]"]').val(user.openid);
           $('#updateModal [name="user[phone]"]').val(user.phone);
         
           $("#updateModal").modal("show");
        });
    });

    $("table .del").click(function (e) {
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
});
