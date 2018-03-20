const routes = require("next-routes")();

routes
	.add("/campaigns/new", "/campaigns/new")
	.add("/campaigns/:address", "/campaigns/show"); //relative path from the pages directory

module.exports = routes;
