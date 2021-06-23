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
        foo: () => {
            return 'foooooo!!!!!!';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZGJBY2Nlc3Nvci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9pbmRleC50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VydmVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTBCO0FBQzFCLHVEQUFvQztBQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLFNBQUksQ0FBQztJQUNwQixRQUFRLEVBQUUsYUFBYTtJQUN2QixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxJQUFJO0NBQ1gsQ0FBQyxDQUFDO0FBRUgsTUFBYSxVQUFVO0lBQXZCO1FBQ1MsUUFBRyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUk7Z0JBQ0YsTUFBTSxLQUFLLEdBQUc7b0JBQ1osSUFBSSxFQUFFLGtDQUFrQztpQkFDekMsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFL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LEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWhELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUlsQiwyQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV2QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUNuQkgsbUQ7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBkYXRhYmFzZTogJ2RldmVsb3BtZW50JyxcbiAgdXNlcjogJ3Jvb3QnLFxuICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgcG9ydDogNTQzMixcbn0pO1xuXG5leHBvcnQgY2xhc3MgREJBY2Nlc3NvciB7XG4gIHB1YmxpYyBnZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIicsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXN1bHQucm93cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGNyZWF0ZSA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnaW5zZXJ0IGludG8gcHVibGljLlwiVG9kb1Rhc2tzXCIgKHV1aWQsIHRpdGxlLCBcImNyZWF0ZWRBdFwiLCBcInVwZGF0ZWRBdFwiKSBWQUxVRVMoJDEsICQyLCBjdXJyZW50X3RpbWVzdGFtcCwgY3VycmVudF90aW1lc3RhbXApJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZHY0KCksIHRpdGxlXSxcbiAgICAgIH07XG4gICAgICBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHtcbiAgICB1dWlkLFxuICAgIHRpdGxlLFxuICAgIHN0YXR1cyxcbiAgfToge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICB9KSA9PiB7XG4gICAgY29uc29sZS5sb2codXVpZCwgdGl0bGUsIHN0YXR1cyk7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAndXBkYXRlIHB1YmxpYy5cIlRvZG9UYXNrc1wiIHNldCB0aXRsZSA9ICQyLCBzdGF0dXM9JDMgd2hlcmUgdXVpZCA9ICQxJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZCwgdGl0bGUsIHN0YXR1c10sXG4gICAgICB9O1xuICAgICAgYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGRlbGV0ZSA9IGFzeW5jICh7IHV1aWQgfTogeyB1dWlkOiBzdHJpbmcgfSkgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ2RlbGV0ZSBmcm9tIHB1YmxpYy5cIlRvZG9UYXNrc1wiIHdoZXJlIHV1aWQgPSAkMScsXG4gICAgICAgIHZhbHVlczogW3V1aWRdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IEV4cHJlc3MgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7fSBmcm9tICdncmFwaHFsLXRvb2xzJztcbmltcG9ydCB7IHJlc29sdmVycyB9IGZyb20gJ3NyYy9ncmFwaHFsL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5cbi8vIEFwb2xsb1xuZXhwb3J0IGNvbnN0IHN0YXJ0QXBvbGxvU2VydmVyID0gYXN5bmMgKGFwcDogRXhwcmVzcykgPT4ge1xuICBjb25zdCB0eXBlRGVmcyA9IGdxbChcbiAgICBmcy5yZWFkRmlsZVN5bmMoJ3NyYy9ncmFwaHFsL3NjaGVtYS5ncmFwaHFsJywge1xuICAgICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgICB9KVxuICApO1xuICBjb25zdCBncWxTcmV2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHsgdHlwZURlZnMsIHJlc29sdmVycyB9KTtcbiAgYXdhaXQgZ3FsU3JldmVyLnN0YXJ0KCk7XG4gIGdxbFNyZXZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHAgfSk7XG59O1xuIiwiaW1wb3J0IHsgUmVzb2x2ZXJzIH0gZnJvbSAnc3JjL2dyYXBocWwvZ2VuZXJhdGVkL2dyYXBocWwnO1xuaW1wb3J0IHsgREJBY2Nlc3NvciB9IGZyb20gJ3NyYy9kYkFjY2Vzc29yJztcblxuY29uc3QgZGJBY2Nlc3NvciA9IG5ldyBEQkFjY2Vzc29yKCk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnM6IFJlc29sdmVycyA9IHtcbiAgUXVlcnk6IHtcbiAgICBoZWxsbzogYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGJBY2Nlc3Nvcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXM6IHtcbiAgICAgICAgICB0ZXh0OiAnaGVsbG8gR3JhcGhHTCAhISEhJyxcbiAgICAgICAgICBudW1iZXI6IDEyMzQ1LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIGZvbzogKCkgPT4ge1xuICAgICAgcmV0dXJuICdmb29vb29vISEhISEhJztcbiAgICB9LFxuICB9LFxuICBIZWxsbzoge1xuICAgIGZ1bmM6IChwLCBhLCBjLCBpKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0gcGFyZW50IC0tLS0tJywgcCk7XG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0gYXJncyAtLS0tLScsIGEpO1xuICAgICAgY29uc29sZS5sb2coJy0tLS0tIGNvbnRleHQgLS0tLS0nLCBjKTtcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLSBpbmZvIC0tLS0tJywgaSk7XG4gICAgICByZXR1cm4gJ2Z1bmNkYXlvJyArIGEudDtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG4vLyBpbXBvcnQgeyBjcmVhdGVSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XG4vLyBpbXBvcnQgeyBjcmVhdGVHcmFwaHFsSFRUUCB9IGZyb20gJy4vZ3JhcGhxbCc7XG5pbXBvcnQgeyBzdGFydEFwb2xsb1NlcnZlciB9IGZyb20gJy4vZ3JhcGhxbCc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbmNvbnN0IHBvcnQgPSAzMDAwO1xuXG4vLyBhcHAudXNlKCcvJywgY3JlYXRlUm91dGVyKCkpO1xuLy8gYXBwLnVzZSgnL2dyYXBocWwnLCBjcmVhdGVHcmFwaHFsSFRUUCgpKTtcbnN0YXJ0QXBvbGxvU2VydmVyKGFwcCk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGdcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=