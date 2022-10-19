const sectionRouter = require("../components/section/network");
const userRouter = require("../components/user/network");

const routes = (server) => {
    server.use('/section', sectionRouter);
    server.use('/user', userRouter);
};

module.exports = routes;