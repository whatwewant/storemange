/****************************************************
  > File Name    : config/route.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 10时42分33秒
 ****************************************************/

var UserController = require('../app/controllers/user');
var StoreController = require('../app/controllers/store');


module.exports = function (app) {
    // user
    app.get('/admin/user', 
            UserController.getListPage);
    app.post('/admin/user',
            UserController.postCreate);
    app.get('/api/v1/admin/user/:id',
            UserController.retrieve);
    app.put('/api/v1/admin/user/:id',
            UserController.update);
    app.delete('/api/v1/admin/user/:id',
            UserController.delete);

    // store
    app.get('/admin/store',
            StoreController.getListPage);
    app.post('/admin/store', 
            StoreController.postCreate);
    app.get('/api/v1/admin/store/:id',
            StoreController.retrieve);
    app.put('/api/v1/admin/store/:id',
            StoreController.update);
    app.delete('/api/v1/admin/store/:id',
            StoreController.delete);

    // activity
};
