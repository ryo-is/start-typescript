/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dbAccessor.ts":
/*!***************************!*\
  !*** ./src/dbAccessor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBAccessor = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const pool = new pg_1.Pool({
    database: 'development',
    user: 'root',
    host: '127.0.0.1',
    port: 5432,
});
class DBAccessor {
    constructor() {
        this.get = async () => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'select * from public."TodoTasks"',
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.create = async (title) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
                    values: [uuid_1.v4(), title],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.update = async ({ uuid, title, status, }) => {
            console.log(uuid, title, status);
            const client = await pool.connect();
            try {
                const query = {
                    text: 'update public."TodoTasks" set title = $2, status=$3 where uuid = $1',
                    values: [uuid, title, status],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.delete = async ({ uuid }) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'delete from public."TodoTasks" where uuid = $1',
                    values: [uuid],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
    }
}
exports.DBAccessor = DBAccessor;


/***/ }),

/***/ "./src/graphql/index.ts":
/*!******************************!*\
  !*** ./src/graphql/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startApolloServer = exports.createGraphqlHTTP = void 0;
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const graphql_tools_1 = __webpack_require__(/*! graphql-tools */ "graphql-tools");
const express_graphql_1 = __webpack_require__(/*! express-graphql */ "express-graphql");
const resolvers_1 = __webpack_require__(/*! src/graphql/resolvers */ "./src/graphql/resolvers.ts");
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
const createGraphqlHTTP = () => {
    const typeDefs = fs_1.default.readFileSync('src/graphql/schema.graphql', {
        encoding: 'utf8',
    });
    const schema = graphql_tools_1.makeExecutableSchema({
        typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    return express_graphql_1.graphqlHTTP({ schema, graphiql: true });
};
exports.createGraphqlHTTP = createGraphqlHTTP;
const startApolloServer = async (app) => {
    const typeDefs = apollo_server_express_1.gql(fs_1.default.readFileSync('src/graphql/schema.graphql', {
        encoding: 'utf8',
    }));
    const gqlSrever = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers: resolvers_1.resolvers });
    await gqlSrever.start();
    gqlSrever.applyMiddleware({ app });
};
exports.startApolloServer = startApolloServer;


/***/ }),

/***/ "./src/graphql/resolvers.ts":
/*!**********************************!*\
  !*** ./src/graphql/resolvers.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const dbAccessor_1 = __webpack_require__(/*! src/dbAccessor */ "./src/dbAccessor.ts");
const dbAccessor = new dbAccessor_1.DBAccessor();
exports.resolvers = {
    Query: {
        hello: async () => {
            console.log(dbAccessor);
            return 'hello GraphGL !!!!';
        },
    },
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const graphql_1 = __webpack_require__(/*! ./graphql */ "./src/graphql/index.ts");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
graphql_1.startApolloServer(app);
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});


/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("graphql-tools");;

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZGJBY2Nlc3Nvci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9pbmRleC50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwiZXhwcmVzcy1ncmFwaHFsXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJncmFwaHFsLXRvb2xzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwicGdcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJ1dWlkXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUEwQjtBQUMxQix1REFBb0M7QUFFcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFJLENBQUM7SUFDcEIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsSUFBSTtDQUNYLENBQUMsQ0FBQztBQUVILE1BQWEsVUFBVTtJQUF2QjtRQUNTLFFBQUcsR0FBRyxLQUFLLElBQUksRUFBRTtZQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJO2dC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LENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFJbEIsMkJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0FDbkJILG1EOzs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7O0FDQUEsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7XG4gIGRhdGFiYXNlOiAnZGV2ZWxvcG1lbnQnLFxuICB1c2VyOiAncm9vdCcsXG4gIGhvc3Q6ICcxMjcuMC4wLjEnLFxuICBwb3J0OiA1NDMyLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBEQkFjY2Vzc29yIHtcbiAgcHVibGljIGdldCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICdzZWxlY3QgKiBmcm9tIHB1YmxpYy5cIlRvZG9UYXNrc1wiJyxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5yb3dzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgY3JlYXRlID0gYXN5bmMgKHRpdGxlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICdpbnNlcnQgaW50byBwdWJsaWMuXCJUb2RvVGFza3NcIiAodXVpZCwgdGl0bGUsIFwiY3JlYXRlZEF0XCIsIFwidXBkYXRlZEF0XCIpIFZBTFVFUygkMSwgJDIsIGN1cnJlbnRfdGltZXN0YW1wLCBjdXJyZW50X3RpbWVzdGFtcCknLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkdjQoKSwgdGl0bGVdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyB1cGRhdGUgPSBhc3luYyAoe1xuICAgIHV1aWQsXG4gICAgdGl0bGUsXG4gICAgc3RhdHVzLFxuICB9OiB7XG4gICAgdXVpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gIH0pID0+IHtcbiAgICBjb25zb2xlLmxvZyh1dWlkLCB0aXRsZSwgc3RhdHVzKTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICd1cGRhdGUgcHVibGljLlwiVG9kb1Rhc2tzXCIgc2V0IHRpdGxlID0gJDIsIHN0YXR1cz0kMyB3aGVyZSB1dWlkID0gJDEnLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkLCB0aXRsZSwgc3RhdHVzXSxcbiAgICAgIH07XG4gICAgICBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgZGVsZXRlID0gYXN5bmMgKHsgdXVpZCB9OiB7IHV1aWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnZGVsZXRlIGZyb20gcHVibGljLlwiVG9kb1Rhc2tzXCIgd2hlcmUgdXVpZCA9ICQxJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZF0sXG4gICAgICB9O1xuICAgICAgYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgRXhwcmVzcyB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGFibGVTY2hlbWEgfSBmcm9tICdncmFwaHFsLXRvb2xzJztcbmltcG9ydCB7IGdyYXBocWxIVFRQIH0gZnJvbSAnZXhwcmVzcy1ncmFwaHFsJztcbmltcG9ydCB7IHJlc29sdmVycyB9IGZyb20gJ3NyYy9ncmFwaHFsL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5cbi8vIGV4cHJlc3MtZ3JhcGhxbFxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdyYXBocWxIVFRQID0gKCkgPT4ge1xuICBjb25zdCB0eXBlRGVmcyA9IGZzLnJlYWRGaWxlU3luYygnc3JjL2dyYXBocWwvc2NoZW1hLmdyYXBocWwnLCB7XG4gICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgfSk7XG4gIGNvbnN0IHNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcbiAgICB0eXBlRGVmcyxcbiAgICByZXNvbHZlcnMsXG4gIH0pO1xuICByZXR1cm4gZ3JhcGhxbEhUVFAoeyBzY2hlbWEsIGdyYXBoaXFsOiB0cnVlIH0pO1xufTtcblxuLy8gQXBvbGxvXG5leHBvcnQgY29uc3Qgc3RhcnRBcG9sbG9TZXJ2ZXIgPSBhc3luYyAoYXBwOiBFeHByZXNzKSA9PiB7XG4gIGNvbnN0IHR5cGVEZWZzID0gZ3FsKFxuICAgIGZzLnJlYWRGaWxlU3luYygnc3JjL2dyYXBocWwvc2NoZW1hLmdyYXBocWwnLCB7XG4gICAgICBlbmNvZGluZzogJ3V0ZjgnLFxuICAgIH0pXG4gICk7XG4gIGNvbnN0IGdxbFNyZXZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoeyB0eXBlRGVmcywgcmVzb2x2ZXJzIH0pO1xuICBhd2FpdCBncWxTcmV2ZXIuc3RhcnQoKTtcbiAgZ3FsU3JldmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCB9KTtcbn07XG4iLCJpbXBvcnQgeyBSZXNvbHZlcnMgfSBmcm9tICdzcmMvZ3JhcGhxbC9nZW5lcmF0ZWQvZ3JhcGhxbCc7XG5pbXBvcnQgeyBEQkFjY2Vzc29yIH0gZnJvbSAnc3JjL2RiQWNjZXNzb3InO1xuXG5jb25zdCBkYkFjY2Vzc29yID0gbmV3IERCQWNjZXNzb3IoKTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVyczogUmVzb2x2ZXJzID0ge1xuICBRdWVyeToge1xuICAgIGhlbGxvOiBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYkFjY2Vzc29yKTtcbiAgICAgIHJldHVybiAnaGVsbG8gR3JhcGhHTCAhISEhJztcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG4vLyBpbXBvcnQgeyBjcmVhdGVSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XG4vLyBpbXBvcnQgeyBjcmVhdGVHcmFwaHFsSFRUUCB9IGZyb20gJy4vZ3JhcGhxbCc7XG5pbXBvcnQgeyBzdGFydEFwb2xsb1NlcnZlciB9IGZyb20gJy4vZ3JhcGhxbCc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbmNvbnN0IHBvcnQgPSAzMDAwO1xuXG4vLyBhcHAudXNlKCcvJywgY3JlYXRlUm91dGVyKCkpO1xuLy8gYXBwLnVzZSgnL2dyYXBocWwnLCBjcmVhdGVHcmFwaHFsSFRUUCgpKTtcbnN0YXJ0QXBvbGxvU2VydmVyKGFwcCk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWdyYXBocWxcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXRvb2xzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZ1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTs7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==