var Resource = require('resourcejs');

module.exports = function(app, route) {

    Resource(app, '', 'server', app.models.server).rest();
    Resource(app, '/server/:serverId', 'measurement', app.models.measurement).rest({
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