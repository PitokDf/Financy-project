"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const config_1 = require("../config");
const node_os_1 = require("node:os");
const app_1 = __importDefault(require("../app"));
const queue_1 = require("../bootstrap/queue");
const jobs_1 = require("../jobs");
let activeServer = null;
let serverStarted = false;
let startupTimeout = null;
function getNetworkAdresses() {
    const nets = (0, node_os_1.networkInterfaces)();
    const results = [];
    for (const name of Object.keys(nets)) {
        const netsInterface = nets[name];
        for (const net of netsInterface) {
            if (net.family === "IPv4" && !net.internal) {
                results.push(net.address);
            }
        }
    }
    return results;
}
function startServer(port) {
    if (serverStarted) {
        return;
    }
    const server = app_1.default.listen(port, () => {
        startupTimeout = setTimeout(() => {
            serverStarted = true;
            const networks = getNetworkAdresses();
            const urls = [
                `http://localhost:${port}`,
                ...networks.map(addr => `http://${addr}:${port}`)
            ];
            activeServer = server;
            winston_logger_1.default.serverStartup(port, config_1.config.NODE_ENV);
            winston_logger_1.default.serverReady(port, urls);
            (0, queue_1.initQueue)();
            (0, jobs_1.initJobs)();
            console.log('\n   ═══════════════════════════════════════════════════════════════');
            console.log('   🚀 EXPRESS SERVER READY');
            console.log('   ═══════════════════════════════════════════════════════════════');
            console.log(`   📍 Environment: ${config_1.config.NODE_ENV.toUpperCase()}`);
            console.log(`   🌐 Service: ${config_1.config.SERVICE}`);
            console.log(`   🔗 URLs:`);
            urls.forEach(url => console.log(`      • ${url}`));
            console.log('   ═══════════════════════════════════════════════════════════════\n');
        }, 100);
    });
    server.on("error", (err) => {
        if (startupTimeout) {
            clearTimeout(startupTimeout);
            startupTimeout = null;
        }
        if (err.code === "EADDRINUSE") {
            winston_logger_1.default.warn(`🔄 Port ${port} is busy, trying port ${port + 1}...`);
            server.close(() => {
                startServer(port + 1);
            });
        }
        else {
            winston_logger_1.default.error("❌ Server startup failed", {
                error: err.message,
                code: err.code,
                stack: err.stack
            });
            process.exit(1);
        }
    });
    return server;
}
process.on('SIGINT', () => {
    winston_logger_1.default.info('🛑 Received SIGINT, shutting down gracefully...');
    if (startupTimeout) {
        clearTimeout(startupTimeout);
        startupTimeout = null;
    }
    if (activeServer) {
        activeServer.close(() => {
            winston_logger_1.default.info('👋 Server closed. Process exiting...');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
process.on('SIGTERM', () => {
    winston_logger_1.default.info('🛑 Received SIGTERM, shutting down gracefully...');
    if (startupTimeout) {
        clearTimeout(startupTimeout);
        startupTimeout = null;
    }
    if (activeServer) {
        activeServer.close(() => {
            winston_logger_1.default.info('👋 Server closed. Process exiting...');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
//# sourceMappingURL=app-utils.js.map