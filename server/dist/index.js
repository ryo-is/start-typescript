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
exports.startApolloServer = void 0;
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const resolvers_1 = __webpack_require__(/*! src/graphql/resolvers */ "./src/graphql/resolvers.ts");
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
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
            return {
                res: {
                    text: 'hello GraphGL !!!!',
                    number: 12345,
                },
            };
        },
    },
    Hello: {
        func: (p, a, c, i) => {
            console.log('----- parent -----', p);
            console.log('----- args -----', a);
            console.log('----- context -----', c);
            console.log('----- info -----', i);
            return 'funcdayo' + a.t;
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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZGJBY2Nlc3Nvci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9pbmRleC50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VydmVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTBCO0FBQzFCLHVEQUFvQztBQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLFNBQUksQ0FBQztJQUNwQixRQUFRLEVBQUUsYUFBYTtJQUN2QixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxJQUFJO0NBQ1gsQ0FBQyxDQUFDO0FBRUgsTUFBYSxVQUFVO0lBQXZCO1FBQ1MsUUFBRyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUk7Z0JBQ0YsTUFBTSxLQUFLLEdBQUc7b0JBQ1osSUFBSSxFQUFFLGtDQUFrQztpQkFDekMsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFL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SSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFJbEIsMkJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0FDbkJILG1EOzs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvb2wgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgZGF0YWJhc2U6ICdkZXZlbG9wbWVudCcsXG4gIHVzZXI6ICdyb290JyxcbiAgaG9zdDogJzEyNy4wLjAuMScsXG4gIHBvcnQ6IDU0MzIsXG59KTtcblxuZXhwb3J0IGNsYXNzIERCQWNjZXNzb3Ige1xuICBwdWJsaWMgZ2V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ3NlbGVjdCAqIGZyb20gcHVibGljLlwiVG9kb1Rhc2tzXCInLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgICByZXR1cm4gcmVzdWx0LnJvd3M7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBjcmVhdGUgPSBhc3luYyAodGl0bGU6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ2luc2VydCBpbnRvIHB1YmxpYy5cIlRvZG9UYXNrc1wiICh1dWlkLCB0aXRsZSwgXCJjcmVhdGVkQXRcIiwgXCJ1cGRhdGVkQXRcIikgVkFMVUVTKCQxLCAkMiwgY3VycmVudF90aW1lc3RhbXAsIGN1cnJlbnRfdGltZXN0YW1wKScsXG4gICAgICAgIHZhbHVlczogW3V1aWR2NCgpLCB0aXRsZV0sXG4gICAgICB9O1xuICAgICAgYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHVwZGF0ZSA9IGFzeW5jICh7XG4gICAgdXVpZCxcbiAgICB0aXRsZSxcbiAgICBzdGF0dXMsXG4gIH06IHtcbiAgICB1dWlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgfSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHV1aWQsIHRpdGxlLCBzdGF0dXMpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ3VwZGF0ZSBwdWJsaWMuXCJUb2RvVGFza3NcIiBzZXQgdGl0bGUgPSAkMiwgc3RhdHVzPSQzIHdoZXJlIHV1aWQgPSAkMScsXG4gICAgICAgIHZhbHVlczogW3V1aWQsIHRpdGxlLCBzdGF0dXNdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBkZWxldGUgPSBhc3luYyAoeyB1dWlkIH06IHsgdXVpZDogc3RyaW5nIH0pID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICdkZWxldGUgZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIiB3aGVyZSB1dWlkID0gJDEnLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkXSxcbiAgICAgIH07XG4gICAgICBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQge30gZnJvbSAnZ3JhcGhxbC10b29scyc7XG5pbXBvcnQgeyByZXNvbHZlcnMgfSBmcm9tICdzcmMvZ3JhcGhxbC9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgQXBvbGxvU2VydmVyLCBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuXG4vLyBBcG9sbG9cbmV4cG9ydCBjb25zdCBzdGFydEFwb2xsb1NlcnZlciA9IGFzeW5jIChhcHA6IEV4cHJlc3MpID0+IHtcbiAgY29uc3QgdHlwZURlZnMgPSBncWwoXG4gICAgZnMucmVhZEZpbGVTeW5jKCdzcmMvZ3JhcGhxbC9zY2hlbWEuZ3JhcGhxbCcsIHtcbiAgICAgIGVuY29kaW5nOiAndXRmOCcsXG4gICAgfSlcbiAgKTtcbiAgY29uc3QgZ3FsU3JldmVyID0gbmV3IEFwb2xsb1NlcnZlcih7IHR5cGVEZWZzLCByZXNvbHZlcnMgfSk7XG4gIGF3YWl0IGdxbFNyZXZlci5zdGFydCgpO1xuICBncWxTcmV2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwIH0pO1xufTtcbiIsImltcG9ydCB7IFJlc29sdmVycyB9IGZyb20gJ3NyYy9ncmFwaHFsL2dlbmVyYXRlZC9ncmFwaHFsJztcbmltcG9ydCB7IERCQWNjZXNzb3IgfSBmcm9tICdzcmMvZGJBY2Nlc3Nvcic7XG5cbmNvbnN0IGRiQWNjZXNzb3IgPSBuZXcgREJBY2Nlc3NvcigpO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzOiBSZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgaGVsbG86IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRiQWNjZXNzb3IpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzOiB7XG4gICAgICAgICAgdGV4dDogJ2hlbGxvIEdyYXBoR0wgISEhIScsXG4gICAgICAgICAgbnVtYmVyOiAxMjM0NSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgfSxcbiAgSGVsbG86IHtcbiAgICBmdW5jOiAocCwgYSwgYywgaSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJy0tLS0tIHBhcmVudCAtLS0tLScsIHApO1xuICAgICAgY29uc29sZS5sb2coJy0tLS0tIGFyZ3MgLS0tLS0nLCBhKTtcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLSBjb250ZXh0IC0tLS0tJywgYyk7XG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0gaW5mbyAtLS0tLScsIGkpO1xuICAgICAgcmV0dXJuICdmdW5jZGF5bycgKyBhLnQ7XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuLy8gaW1wb3J0IHsgY3JlYXRlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuLy8gaW1wb3J0IHsgY3JlYXRlR3JhcGhxbEhUVFAgfSBmcm9tICcuL2dyYXBocWwnO1xuaW1wb3J0IHsgc3RhcnRBcG9sbG9TZXJ2ZXIgfSBmcm9tICcuL2dyYXBocWwnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG5jb25zdCBwb3J0ID0gMzAwMDtcblxuLy8gYXBwLnVzZSgnLycsIGNyZWF0ZVJvdXRlcigpKTtcbi8vIGFwcC51c2UoJy9ncmFwaHFsJywgY3JlYXRlR3JhcGhxbEhUVFAoKSk7XG5zdGFydEFwb2xsb1NlcnZlcihhcHApO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYExpc3RlbmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vYCk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9