const sectionRouter = require("../components/section/network");

const routes = (server) => {
    server.use('/section', sectionRouter);
};

module.exports = routes;