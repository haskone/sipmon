var Resource = require('resourcejs');

module.exports = function(app, route) {

    Resource(app, '', 'server', app.models.server).rest();
    Resource(app, '/server/:serverId', 'stat', app.models.stat).rest({
        before: function(req, res, next) {
            req.body.parent = req.params.serverId;
            req.modelQuery = this.model.where('parent', req.params.parentId);
            next();
        }
    });

    return function(req, res, next) {
        next();
    };
};