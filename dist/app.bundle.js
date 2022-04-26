/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "aa2118ef1f7b6dea6057";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./log\": \"./node_modules/webpack/hot/log.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/webpack/hot sync ^\\\\.\\\\/log$\";\n\n//# sourceURL=webpack:///(webpack)/hot_sync_nonrecursive_^\\.\\/log$?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.updateStatic = exports.initDynamicAndStaticQueues = exports.compoundBlocks = exports.igniteCrate = exports.updateDynamic = exports.igniteNeighbors = exports.igniteCompound = exports.clearTiles = exports.getTileCenter = exports.blockId = exports.getDiffFromTileCenter = exports.getTile = exports.getGameHeight = exports.getGameWidth = void 0;\nvar clump_1 = __webpack_require__(/*! ./helpers/clump */ \"./src/helpers/clump.ts\");\nvar compound_1 = __webpack_require__(/*! ./objects/compound */ \"./src/objects/compound.ts\");\n// lots of these functions are really for helping with block movement or burning\nfunction isDynamicTerrain(s) {\n    return s.includes('crate') || s.includes('steel');\n}\nvar getGameWidth = function (scene) {\n    return scene.game.scale.width;\n};\nexports.getGameWidth = getGameWidth;\nvar getGameHeight = function (scene) {\n    return scene.game.scale.height;\n};\nexports.getGameHeight = getGameHeight;\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nexports.getTile = getTile;\nfunction getDiffFromTileCenter(x, y) {\n    var _a = __read(getTile(x, y), 2), i = _a[0], j = _a[1];\n    return [Math.abs(i * 50 + 25 - x), Math.abs(j * 50 + 25 - y)];\n}\nexports.getDiffFromTileCenter = getDiffFromTileCenter;\nfunction blockId(block) {\n    var _a = __read(getTileCenter(block.sprite.x, block.sprite.y), 2), i = _a[0], j = _a[1];\n    return i + ',' + j;\n}\nexports.blockId = blockId;\n//center of tile in pixels, to set crate position, takes in pixel position\nfunction getTileCenter(x, y) {\n    var _a = __read(getTile(x, y), 2), i = _a[0], j = _a[1];\n    return [i * 50 + 25, j * 50 + 25];\n}\nexports.getTileCenter = getTileCenter;\nfunction clearTiles(game) {\n    for (var i = 0; i < game.tiles.length; i++) {\n        for (var j = 0; j < game.tiles[0].length; j++) {\n            game.tiles[i][j].clear();\n        }\n    }\n}\nexports.clearTiles = clearTiles;\nfunction igniteCompound(game, curr) {\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.blocks.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n}\nexports.igniteCompound = igniteCompound;\n// function igniteLava(game, currLava: Lava) {\n// }\n// TODO ADD ABOVE BLOCKS TO DYNAMIC QUEUE WHEN CONNECTED CRATE IS DESTROYED\nfunction igniteNeighbors(game, x, y, currCrate) {\n    var candidates = [\n        [x - 1, y],\n        [x + 1, y],\n        [x, y + 1],\n        [x, y - 1],\n    ];\n    for (var i = 0; i < candidates.length; i++) {\n        var x_1 = candidates[i][0];\n        var y_1 = candidates[i][1];\n        if (x_1 >= 0 && x_1 < game.xTiles && y_1 >= 0 && y_1 < game.yTiles && game.tiles[x_1][y_1]) {\n            game.tiles[x_1][y_1].forEach(function (e) {\n                game.burnQueue.add(e.owner);\n            });\n        }\n    }\n    if (currCrate.isLava) {\n        game.time.delayedCall(1000, function () {\n            var pos = getTile(currCrate.sprite.x, currCrate.sprite.y);\n            var xi = pos[0];\n            var yi = pos[1];\n            igniteNeighbors(game, xi, yi, currCrate);\n        });\n    }\n}\nexports.igniteNeighbors = igniteNeighbors;\nfunction updateDynamic(game) {\n    //TODO: FIX THIS CRAP AND MAKE SURE BLOCKS ABOVE A DESTROYED BLOCK WILL BE CHECKED IF ALSO BURNING OR NOT, PLUS CORRECTLY SET STATIC OR NOT\n    var seen = new Set();\n    game.staticBlockQueue.forEach(function (block) {\n        seen.add(block);\n        var _a = __read(getTileCenter(block.sprite.x, block.sprite.y), 2), bx = _a[0], by = _a[1];\n        //remove block from static blocks map\n        delete game.blocks[bx + ',' + by]; // perhaps its not always in the map? might be due to bug\n        ///\n        block.sprite.setStatic(false);\n        // ownedBlock.sprite.setPosition(bx, by);\n        console.log(block);\n        // ownedBlock.sprite.setStatic(true);\n        ///\n        block.sprite.tint = 0xffffff;\n        game.dynamicBlockQueue.add(block);\n        // block.owner.blocks.forEach((ownedBlock: Terrain) => {\n        //   if (ownedBlock.sprite.active && ownedBlock.sprite.isStatic() && !seen.has(ownedBlock)) {\n        //     seen.add(ownedBlock);\n        //     const [bx, by] = getTileCenter(ownedBlock.sprite.x, ownedBlock.sprite.y);\n        //     //remove block from static blocks map\n        //     delete game.blocks[bx + ',' + by]; // perhaps its not always in the map? might be due to bug\n        //     ///\n        //     ownedBlock.sprite.setStatic(false);\n        //     // ownedBlock.sprite.setPosition(bx, by);\n        //     console.log(ownedBlock);\n        //     // ownedBlock.sprite.setStatic(true);\n        //     ///\n        //     ownedBlock.sprite.tint = 0xffffff;\n        //     game.dynamicBlockQueue.add(ownedBlock);\n        //   }\n        // });\n    });\n    game.staticBlockQueue.clear();\n}\nexports.updateDynamic = updateDynamic;\n// export function updateDynamic(game: GameScene) {\n//   //TODO: FIX THIS CRAP AND MAKE SURE BLOCKS ABOVE A DESTROYED BLOCK WILL BE CHECKED IF ALSO BURNING OR NOT, PLUS CORRECTLY SET STATIC OR NOT\n//   const nextQueue: Array<Terrain> = [];\n//   game.staticBlockQueue.forEach((block: Terrain) => {\n//     let cont = true;\n//     let counter = 0;\n//     while (cont) {\n//       //the above block\n//       const [px, py] = getTileCenter(block.sprite.x, block.sprite.y - counter * 50);\n//       const aboveBlock = game.blocks[px + ',' + py];\n//       if (\n//         aboveBlock &&\n//         aboveBlock.sprite.active &&\n//         aboveBlock.name != 'dirt' &&\n//         !checkOwnerGrounded(game, aboveBlock)\n//       ) {\n//         //add all blocks to dynamicqueue until u hit a dirt?\n//         //TODO make queue to set dynamic in order to sync\n//         game.staticBlockQueue.push(aboveBlock);\n//       } else {\n//         // if a block is supported by something else\n//         //TODO still need to consider connectors, only using compounds rn\n//         cont = false;\n//       }\n//       counter += 1;\n//     }\n//     block.sprite.setStatic(false);\n//     block.sprite.tint = 0xffffff;\n//     game.dynamicBlockQueue.add(block);\n//     //remove block from static blocks map\n//     const [px, py] = getTileCenter(block.sprite.x, block.sprite.y);\n//     delete game.blocks[px + ',' + py];\n//   });\n// }\n//TODO: MOVE TO CRATE CLASS OR UTILS\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        // TODO: move this fire stuff to the crate class\n        if (currCrate.fireSprite.active && !currCrate.isLava) {\n            currCrate.fireSprite.alpha = 0;\n        }\n        if (currCrate.sprite.active) {\n            var pos = getTile(currCrate.sprite.x, currCrate.sprite.y);\n            var x = pos[0];\n            var y = pos[1];\n            if (!currCrate.isLava) {\n                var fireDisappear_1 = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');\n                fireDisappear_1.anims.play('fireDisappear', false);\n                fireDisappear_1.once('animationcomplete', function () {\n                    fireDisappear_1.alpha = 0;\n                });\n                // currCrate.owner.blocks.forEach((crate: Crate) => {\n                //   game.destroyQueue.add(crate);\n                //   //remove destroyed crate, might need to do this for all other crates too\n                //   delete game.blocks[blockId(crate)];\n                // });\n                currCrate.owner.blocks.forEach(function (e) {\n                    game.destroyQueue.add(e);\n                });\n                game.destroyQueue.add(currCrate);\n                //remove destroyed crate, might need to do this for all other crates too\n                if (game.blocks[blockId(currCrate)] == currCrate) {\n                    delete game.blocks[blockId(currCrate)];\n                }\n                ///////////////////////////////\n                var curr = void 0;\n                var next_1 = new Set();\n                var seen_1 = new Set();\n                var tempQueue_1 = new Set();\n                // const [px, py] = getTileCenter(currCrate.sprite.x, currCrate.sprite.y - 50);\n                // const aboveBlock = game.blocks[px + ',' + py];\n                currCrate.getConnected(new Set(), game).forEach(function (connectedToCrate) {\n                    if (connectedToCrate &&\n                        !seen_1.has(connectedToCrate) &&\n                        connectedToCrate.sprite.active &&\n                        isDynamicTerrain(connectedToCrate.sprite.name) &&\n                        // !currBlock.owner.blocks.has(aboveBlock) && //REDUNDANT?\n                        !checkOwnerGrounded(game, connectedToCrate, tempQueue_1)) {\n                        next_1.add(connectedToCrate);\n                        seen_1.add(connectedToCrate);\n                        game.staticBlockQueue.add(connectedToCrate);\n                    }\n                });\n                next_1.add(currCrate);\n                seen_1.add(currCrate);\n                while (next_1.size > 0) {\n                    curr = next_1;\n                    next_1 = new Set();\n                    curr.forEach(function (currBlock) {\n                        //the above block\n                        if (currBlock && currBlock.sprite.active) {\n                            var _a = __read(getTileCenter(currBlock.sprite.x, currBlock.sprite.y - 50), 2), px = _a[0], py = _a[1];\n                            var aboveBlock = game.blocks[px + ',' + py];\n                            if (aboveBlock &&\n                                !seen_1.has(aboveBlock) &&\n                                aboveBlock.sprite.active &&\n                                isDynamicTerrain(aboveBlock.sprite.name) &&\n                                // !currBlock.owner.blocks.has(aboveBlock) && //REDUNDANT?\n                                !checkOwnerGrounded(game, aboveBlock, tempQueue_1)) {\n                                // check compound blocks\n                                aboveBlock.owner.blocks.forEach(function (block) {\n                                    if (!seen_1.has(block)) {\n                                        next_1.add(block);\n                                        seen_1.add(block);\n                                        game.staticBlockQueue.add(block);\n                                    }\n                                });\n                                // check any block connected with connectors\n                                aboveBlock.owner.getConnected(game).forEach(function (block) {\n                                    if (!seen_1.has(block)) {\n                                        next_1.add(block);\n                                        seen_1.add(block);\n                                        game.staticBlockQueue.add(block);\n                                    }\n                                });\n                                // next.add(aboveBlock);\n                                // seen.add(aboveBlock);\n                                // game.staticBlockQueue.add(aboveBlock);\n                                //CHANGE TO SET SINCE LIST NOT CASH MONEY, REVISE THIS GARBAGE\n                                // game.staticBlockQueue.add(aboveBlock);\n                            }\n                        }\n                    });\n                }\n                // tempQueue.forEach((elem: Terrain) => game.staticBlockQueue.add(elem));\n                ////////////////////////////////\n            }\n            igniteNeighbors(game, x, y, currCrate);\n        }\n    });\n}\nexports.igniteCrate = igniteCrate;\n// assumes valid set of blocks given eg only crates or only steel blocks\nfunction compoundBlocks(game, blocks) {\n    var trackBlocks = new Set();\n    blocks.forEach(function (e) {\n        var name = e.x + ',' + e.y;\n        if (!trackBlocks.has(name)) {\n            var curr = [name];\n            var next_2 = [];\n            var toCompound_1 = new Set();\n            while (curr.length != 0) {\n                curr.forEach(function (i) {\n                    var id = clump_1.indexes[parseInt(game.blocks[i].sprite.frame.name)];\n                    // odd numbers are sides\n                    var sides = id.split('');\n                    trackBlocks.add(i);\n                    toCompound_1.add(game.blocks[i]);\n                    var x = game.blocks[i].sprite.x;\n                    var y = game.blocks[i].sprite.y;\n                    var up = x + ',' + (y - 50);\n                    var right = x + 50 + ',' + y;\n                    var down = x + ',' + (y + 50);\n                    var left = x - 50 + ',' + y;\n                    function compoundCrates(tile, game) {\n                        next_2.push(tile);\n                        trackBlocks.add(tile);\n                        toCompound_1.add(game.blocks[tile]);\n                    }\n                    if (sides[1] == 1 && !trackBlocks.has(up)) {\n                        compoundCrates(up, game);\n                    }\n                    if (sides[3] == 1 && !trackBlocks.has(right)) {\n                        compoundCrates(right, game);\n                    }\n                    if (sides[5] == 1 && !trackBlocks.has(down)) {\n                        compoundCrates(down, game);\n                    }\n                    if (sides[7] == 1 && !trackBlocks.has(left)) {\n                        compoundCrates(left, game);\n                    }\n                });\n                curr = next_2;\n                next_2 = [];\n            }\n            new compound_1.default(game, toCompound_1);\n        }\n    });\n}\nexports.compoundBlocks = compoundBlocks;\nfunction unpack(coord) {\n    var split = coord.indexOf(',');\n    var i = parseInt(coord.substring(0, split));\n    var j = parseInt(coord.substring(split + 1));\n    return [i, j];\n}\n//CALL AFTER ALL COMPOUNDING IS DONE SINCE GAME.BLOCKS IS USED THERE TOO\nfunction initDynamicAndStaticQueues(game) {\n    var e_1, _a;\n    game.dynamicBlockQueue.clear();\n    var _loop_1 = function (pos, block) {\n        //const [x, y] = unpack(pos);\n        //LEFT OFF HERE CHECK IF CRATE THEN PRINT\n        if (isDynamicTerrain(block.sprite.name)) {\n            var connected = block.owner.getConnected(game);\n            var connectedToStatic_1 = false;\n            connected.forEach(function (connectedBlock) {\n                // console.log(connectedBlock);\n                if (connectedBlock.sprite.active && connectedBlock.sprite.isStatic()) {\n                    connectedToStatic_1 = true;\n                }\n            });\n            console.log(block);\n            console.log(connectedToStatic_1);\n            if (connectedToStatic_1) {\n                block.setGrounded();\n            }\n            if (!block.sprite.isStatic()) {\n                console.log('added to dynamic init');\n                game.dynamicBlockQueue.add(block);\n                delete game.blocks[pos];\n            }\n        }\n    };\n    try {\n        for (var _b = __values(Object.entries(game.blocks)), _c = _b.next(); !_c.done; _c = _b.next()) {\n            var _d = __read(_c.value, 2), pos = _d[0], block = _d[1];\n            _loop_1(pos, block);\n        }\n    }\n    catch (e_1_1) { e_1 = { error: e_1_1 }; }\n    finally {\n        try {\n            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n        }\n        finally { if (e_1) throw e_1.error; }\n    }\n}\nexports.initDynamicAndStaticQueues = initDynamicAndStaticQueues;\nfunction updateStatic(game) {\n    var e_2, _a;\n    //HAVE TO MAKE COPY OF BLOCK MAP OR ELSE OLD POSITION GETS ERASED BY NEW THINGS?\n    //OTHER BLOCKS CONFLICT ATM\n    var toDeleteInMap = new Set();\n    var toAddToMap = {};\n    var nextQueue = new Set();\n    game.dynamicBlockQueue.forEach(function (block) {\n        //ACTUALLY JUST ADD THE BLOCK ITSELF CAUSE STRING AINT WORKING\n        //HAVE BLOCKPOS ONLY CONTAIN BLOCKS THAT ARE STATIC\n        var _a = __read(getDiffFromTileCenter(block.sprite.x, block.sprite.y), 2), dx = _a[0], dy = _a[1];\n        var _b = __read(getTileCenter(block.sprite.x, block.sprite.y), 2), px = _b[0], py = _b[1];\n        var downId = px + ',' + (py + 50);\n        // console.log(game.blocks);\n        if (block.sprite.active) {\n            //TODO MAYBE CHECK IF IN MAP ALREADY, add both curr and already in map block back into the queue to guarantee no bugs if slot is already occupied, or replace with grounded check\n            if (dy < 17 &&\n                game.blocks[downId] &&\n                game.blocks[downId].sprite.active &&\n                // !block.sprite.isStatic() && // block itself is not static already\n                !game.blocks[downId].owner.blocks.has(block) &&\n                !game.blocks[downId].owner.getConnected(game).has(block) &&\n                game.blocks[downId].sprite.isStatic() &&\n                !game.destroyQueue.has(game.blocks[downId])) {\n                block.owner.setAllGrounded(game);\n                //TODO add all blocks in compound instead of just this, to enforce precondition of all blocks being dynamic in queue\n                toAddToMap[px + ',' + py] = block;\n            }\n            else if (!block.sprite.isStatic()) {\n                if (block.sprite.body.velocity.y > 12)\n                    block.sprite.setVelocityY(12);\n                nextQueue.add(block);\n            }\n            else if (block.sprite.active && block.sprite.isStatic()) {\n                toAddToMap[px + ',' + py] = block;\n            }\n        }\n    });\n    try {\n        for (var _b = __values(Object.entries(toAddToMap)), _c = _b.next(); !_c.done; _c = _b.next()) {\n            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];\n            game.blocks[key] = value;\n        }\n    }\n    catch (e_2_1) { e_2 = { error: e_2_1 }; }\n    finally {\n        try {\n            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n        }\n        finally { if (e_2) throw e_2.error; }\n    }\n    game.dynamicBlockQueue = nextQueue;\n    //ultimate test, single crates and lots of clumped up crates\n}\nexports.updateStatic = updateStatic;\n// check if to make block non static in case blocks are destroyed\nfunction checkBlockGrounded(game, block, tempQueue, connectedBlocks) {\n    //const [dx, dy] = getDiffFromTileCenter(block.sprite.x, block.sprite.y);\n    // TODO EDGE CASE OF OTHER BLOCKS ABOVE ONE THAT FELL DOWN IF A SPECIAL LONG SHAPE\n    // TODO ALSO IF [][][]\n    //                [][]\n    //                  [] MIGHT HAVE ISSUES CHECKING GROUNDED\n    var _a = __read(getTileCenter(block.sprite.x, block.sprite.y), 2), px = _a[0], py = _a[1];\n    var downId = px + ',' + (py + 50);\n    var downBlock = game.blocks[downId];\n    // console.log(game.blocks[downId]);\n    if (block.sprite.active) {\n        console.log(downBlock &&\n            downBlock.sprite.active &&\n            downBlock.sprite.isStatic() &&\n            !game.staticBlockQueue.has(downBlock) && // not in queue to become unstatic\n            !tempQueue.has(downBlock) &&\n            !game.destroyQueue.has(downBlock) && // not about to be destroyed\n            isDynamicTerrain(downBlock.sprite.name) && // can't become unstatic if is dirt\n            !block.owner.blocks.has(downBlock) &&\n            !connectedBlocks.has(downBlock));\n        return (downBlock &&\n            downBlock.sprite.active &&\n            downBlock.sprite.isStatic() &&\n            !game.staticBlockQueue.has(downBlock) && // not in queue to become unstatic\n            !tempQueue.has(downBlock) &&\n            !game.destroyQueue.has(downBlock) && // not about to be destroyed\n            isDynamicTerrain(downBlock.sprite.name) && // can't become unstatic if is dirt\n            !block.owner.blocks.has(downBlock) &&\n            !connectedBlocks.has(downBlock));\n    }\n}\n// since this checks if all blocks except the ones above the one destroyed (given in parameters),\n// we remove that block. and check the other blocks in its compound\nfunction checkOwnerGrounded(game, block, tempQueue) {\n    var result = false;\n    var owner = block.owner;\n    var blocks = new Set(owner.blocks);\n    blocks.delete(block);\n    var connected = owner.getConnected(game);\n    // TODO: might actually have to combine all blocks for the check\n    blocks.forEach(function (block) {\n        //if any blocks are grounded in a compound, the whole compound is grounded\n        if (checkBlockGrounded(game, block, tempQueue, connected)) {\n            result = true;\n        }\n    });\n    // TODO: this might be redundant, might want to fix this, for the connected blocks if they should ground too\n    connected.forEach(function (block) {\n        if (checkBlockGrounded(game, block, tempQueue, connected)) {\n            result = true;\n        }\n    });\n    // console.log(result);\n    return result;\n}\n\n\n//# sourceURL=webpack:///./src/helpers.ts?");

/***/ }),

/***/ "./src/helpers/alignGrid.ts":
/*!**********************************!*\
  !*** ./src/helpers/alignGrid.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clump_1 = __webpack_require__(/*! ./clump */ \"./src/helpers/clump.ts\");\nvar TILE_SIZE = 50;\nvar clumpables = new Set(['dirt', 'lava', 'crate', 'steel']);\nfunction isTerrain(s) {\n    return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');\n}\nvar AlignGrid = /** @class */ (function () {\n    // public clumps = new Map<integer, Set<string>>();\n    function AlignGrid(config) {\n        this.counter = 0;\n        if (!config.scene) {\n            console.log('missing scene!');\n            return;\n        }\n        if (!config.rows) {\n            console.log('no rows given wee woo');\n        }\n        if (!config.cols) {\n            console.log('no columns given wee woo');\n        }\n        this.h = config.rows * TILE_SIZE;\n        this.w = config.cols * TILE_SIZE;\n        this.rows = config.rows;\n        this.cols = config.cols;\n        this.scene = config.scene;\n        this.grid = new Array(this.cols);\n        this.connectors = {};\n        this.selected = 'lavaTile';\n        for (var i = 0; i < this.cols; i++) {\n            this.grid[i] = new Array(this.rows);\n        }\n        this.playerTile = null;\n    }\n    AlignGrid.prototype.show = function (a) {\n        if (a === void 0) { a = 0.7; }\n        this.graphics = this.scene.add.graphics();\n        this.graphics.lineStyle(1, 0xff0000, a);\n        for (var i = 0; i < this.w; i += TILE_SIZE) {\n            this.graphics.moveTo(i, 0);\n            this.graphics.lineTo(i, this.h);\n        }\n        for (var i = 0; i < this.h; i += TILE_SIZE) {\n            this.graphics.moveTo(0, i);\n            this.graphics.lineTo(this.w, i);\n        }\n        this.graphics.strokePath();\n    };\n    AlignGrid.prototype.clearConnector = function (row, col) {\n        var _this = this;\n        this.neighbors4(row, col).forEach(function (e) {\n            var a = _this.unpack(e)[0];\n            var b = _this.unpack(e)[1];\n            var ip = _this.getPixel(row);\n            var jp = _this.getPixel(col);\n            var xp = ip + (a - row) * 25;\n            var yp = jp + (b - col) * 25;\n            var id = xp + ',' + yp;\n            if (id in _this.connectors) {\n                _this.connectors[id].destroy();\n                delete _this.connectors[id];\n            }\n        });\n    };\n    AlignGrid.prototype.clearTile = function (row, col, game) {\n        var _this = this;\n        if (this.grid[row][col]) {\n            var name_1 = this.grid[row][col].name;\n            var frame = this.grid[row][col].frame.name;\n            if (name_1 == 'player') {\n                return;\n            }\n            this.grid[row][col].destroy();\n            this.grid[row][col] = null;\n            //@ts-ignore\n            if (clumpables.has(name_1) && frame != 0) {\n                this.neighbors(row, col).forEach(function (e) {\n                    var _a = __read(_this.unpack(e), 2), nx = _a[0], ny = _a[1];\n                    console.log(nx);\n                    console.log(ny);\n                    //@ts-ignore\n                    if (nx >= 0 && ny >= 0 && _this.grid[nx][ny] && _this.grid[nx][ny].frame.name != 0) {\n                        _this.clumpBox(nx, ny, nx, ny);\n                    }\n                });\n            }\n        }\n        this.grid[row][col] = null;\n        this.clearConnector(row, col);\n    };\n    AlignGrid.prototype.placeAtPreset = function (x1, y1, objName, frame, game) {\n        this.placeAt(x1, y1, objName, game);\n        var row = Math.floor(x1 / TILE_SIZE);\n        var col = Math.floor(y1 / TILE_SIZE);\n        this.grid[row][col].setFrame(frame);\n    };\n    AlignGrid.prototype.placeAt = function (x1, y1, objName, game) {\n        //converted centered coordinates in pixels to place in grid square\n        var row = Math.floor(x1 / TILE_SIZE);\n        var col = Math.floor(y1 / TILE_SIZE);\n        var x2 = row * TILE_SIZE + TILE_SIZE / 2;\n        var y2 = col * TILE_SIZE + TILE_SIZE / 2;\n        //if clearing instead\n        if (objName == 'clear') {\n            this.clearTile(row, col, game);\n            return;\n        }\n        if (this.grid[row][col]) {\n            if (this.playerTile && this.playerTile[0] == row && this.playerTile[1] == col) {\n                return;\n            }\n        }\n        this.clearTile(row, col, game);\n        if (objName == 'player') {\n            if (this.playerTile) {\n                var _a = __read(this.playerTile, 2), a = _a[0], b = _a[1];\n                this.grid[a][b].destroy();\n                this.grid[a][b] = null;\n            }\n            this.playerTile = [row, col];\n        }\n        var obj = game.add.image(x2, y2, objName);\n        if (objName == 'lizard' || objName.includes('spider')) {\n            obj.scaleX = 0.7;\n            if (objName.includes('spider')) {\n                obj.scaleY = 0.9;\n            }\n        }\n        obj.name = objName;\n        this.grid[row][col] = obj;\n        obj.x = x2;\n        obj.y = y2;\n    };\n    AlignGrid.prototype.getRowOrCol = function (pixel) {\n        return Math.floor(pixel / TILE_SIZE);\n    };\n    AlignGrid.prototype.getPixel = function (rowOrCol) {\n        return rowOrCol * TILE_SIZE + TILE_SIZE / 2;\n    };\n    AlignGrid.prototype.neighbors = function (i, j) {\n        return [\n            i - 1 + ',' + (j - 1),\n            i + ',' + (j - 1),\n            i + 1 + ',' + (j - 1),\n            i + 1 + ',' + j,\n            i + 1 + ',' + (j + 1),\n            i + ',' + (j + 1),\n            i - 1 + ',' + (j + 1),\n            i - 1 + ',' + j,\n        ];\n    };\n    AlignGrid.prototype.neighbors4 = function (i, j) {\n        // eslint-disable-next-line prettier/prettier\n        return [i + ',' + (j - 1), i + 1 + ',' + j, i + ',' + (j + 1), i - 1 + ',' + j];\n    };\n    AlignGrid.prototype.checkConnected = function (nx, ny, i, j, checkId) {\n        return ((ny < j && nx == i && checkId.charAt(5) == '1') || // top\n            (ny < j && nx > i && checkId.charAt(4) == '1') || // top right\n            (ny > j && nx == i && checkId.charAt(1) == '1') || // bottom\n            (ny > j && nx > i && checkId.charAt(0) == '1') || // bottom right\n            (nx > i && ny == j && checkId.charAt(7) == '1') || // right\n            (nx < i && ny == j && checkId.charAt(3) == '1') || // left\n            (nx < i && ny > j && checkId.charAt(2) == '1') || // bottom left\n            (nx < i && ny < j && checkId.charAt(4) == '1') // top left\n        );\n    };\n    AlignGrid.prototype.unpack = function (coord) {\n        var split = coord.indexOf(',');\n        var i = parseInt(coord.substring(0, split));\n        var j = parseInt(coord.substring(split + 1));\n        return [i, j];\n    };\n    /**\n     * start and end of rectangle drawn by mouse to clump selected tiles\n     * FIX TO TAKE SET OF TILES INSTEAD OF RECTANGLE? TODO\n     * @param sx start x pixel coordinate\n     * @param sy start y pixel coordinate\n     * @param ex end x pixel coordinate\n     * @param ey end y pixel coordinate\n     */\n    AlignGrid.prototype.clumpBox = function (sr, sc, er, ec) {\n        var _this = this;\n        // sr = sr < er ? sr : er;\n        // er = sr < er ? sr : er;\n        // sc = sc < ec ? sc : ec;\n        // ec = sc < ec ? sc : ec;\n        var curr = new Set();\n        var check = new Set();\n        // DO BFS\n        for (var i = sr; i <= er; i++) {\n            for (var j = sc; j <= ec; j++) {\n                if (this.grid[i][j]) {\n                    curr.add(i + ',' + j);\n                    check.add(i + ',' + j);\n                    this.neighbors(i, j).forEach(function (e) {\n                        var _a = __read(_this.unpack(e), 2), nx = _a[0], ny = _a[1];\n                        if (nx > 0 && nx < _this.cols && ny > 0 && ny < _this.rows) {\n                            if (_this.grid[nx][ny] && _this.grid[nx][ny].frame.name != '0') {\n                                var checkId = clump_1.indexes[parseInt(_this.grid[nx][ny].frame.name)];\n                                // const checkId = String(this.grid[nx][ny].frame.name);\n                                if (_this.checkConnected) {\n                                    //   console.log('checking this bug man');\n                                    //NEED TO BFS AGAIN\n                                    check.add(e);\n                                }\n                            }\n                        }\n                    });\n                    console.log(check);\n                }\n            }\n        }\n        this.clump(curr, check);\n    };\n    AlignGrid.prototype.clump = function (curr, check) {\n        var _this = this;\n        // figure out which tile texture to use based on spritesheet\n        // ensured that none are null in curr\n        curr.forEach(function (e) {\n            var _a = __read(_this.unpack(e), 2), i = _a[0], j = _a[1];\n            _this.clearConnector(i, j);\n            if (clumpables.has(_this.grid[i][j].name)) {\n                var candidates = _this.neighbors(i, j);\n                // all sides of the tile grabbed from the tilesheets\n                var id = [1, 1, 1, 1, 1, 1, 1, 1];\n                var pointer = 0;\n                for (var x = 0; x < candidates.length; x++) {\n                    var coord = candidates[x];\n                    var a = _this.unpack(coord)[0];\n                    var b = _this.unpack(coord)[1];\n                    if (!(check.has(coord) && _this.grid[a][b].name == _this.grid[i][j].name)) {\n                        if (x % 2 == 0) {\n                            id[pointer] = 0;\n                        }\n                        else {\n                            id[pointer] = 0;\n                            id[pointer + 1] = 0;\n                            // wrap around to 7\n                            if (pointer + 2 > 7) {\n                                id[0] = 0;\n                            }\n                            else {\n                                id[pointer + 2] = 0;\n                            }\n                        }\n                    }\n                    if (x % 2 == 1) {\n                        pointer += 2;\n                    }\n                }\n                _this.grid[i][j].setFrame(clump_1.tiles[id.join('')]);\n            }\n        });\n    };\n    AlignGrid.prototype.connect = function (sr, sc, er, ec, game) {\n        var _this = this;\n        // sr = sr < er ? sr : er;\n        // er = sr < er ? sr : er;\n        // sc = sc < ec ? sc : ec;\n        // ec = sc < ec ? sc : ec;\n        if (er >= this.grid.length || ec > this.grid[0].length) {\n            return;\n        }\n        var curr = new Set();\n        var check = new Set();\n        // DO BFS and add tiles to initalized bfs\n        for (var i = sr; i <= er; i++) {\n            for (var j = sc; j <= ec; j++) {\n                if (this.grid[i][j]) {\n                    curr.add(i + ',' + j);\n                }\n            }\n        }\n        // figure out which tile texture to use based on spritesheet\n        // ensured that none are null in curr\n        curr.forEach(function (e) {\n            var _a = __read(_this.unpack(e), 2), i = _a[0], j = _a[1];\n            if (clumpables.has(_this.grid[i][j].name)) {\n                var candidates = _this.neighbors4(i, j);\n                // all sides of the tile grabbed from the tilesheets\n                var id = clump_1.indexes[parseInt(_this.grid[i][j].frame.name)].split('');\n                for (var x = 0; x < candidates.length; x++) {\n                    var coord = candidates[x];\n                    var a = _this.unpack(coord)[0];\n                    var b = _this.unpack(coord)[1];\n                    // find the id of the frame to use and what sides are available to join\n                    var flag = false;\n                    var rotate = false;\n                    if (curr.has(coord) && isTerrain(_this.grid[a][b].name)) {\n                        var neighborId = clump_1.indexes[parseInt(_this.grid[a][b].frame.name)];\n                        var ip = _this.getPixel(i);\n                        var jp = _this.getPixel(j);\n                        var coordId = ip + ',' + jp;\n                        if (a > i) {\n                            if (neighborId[7] == '0' && id[3] == '0') {\n                                flag = true;\n                            }\n                        }\n                        else if (a < i) {\n                            if (neighborId[3] == '0' && id[7] == '0') {\n                                flag = true;\n                            }\n                        }\n                        else if (b > j) {\n                            if (neighborId[1] == '0' && id[5] == '0') {\n                                flag = true;\n                                rotate = true;\n                            }\n                        }\n                        else if (b < j) {\n                            if (neighborId[5] == '0' && id[1] == '0') {\n                                flag = true;\n                                rotate = true;\n                            }\n                        }\n                        if (flag) {\n                            var xp = ip + (a - i) * 25;\n                            var yp = jp + (b - j) * 25;\n                            var id_1 = xp + ',' + yp;\n                            if (!(id_1 in _this.connectors)) {\n                                _this.connectors[id_1] = game.add.image(xp, yp, 'connector');\n                                if (rotate) {\n                                    _this.connectors[id_1].angle = 90;\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        });\n    };\n    return AlignGrid;\n}());\nexports.default = AlignGrid;\n\n\n//# sourceURL=webpack:///./src/helpers/alignGrid.ts?");

/***/ }),

/***/ "./src/helpers/clump.ts":
/*!******************************!*\
  !*** ./src/helpers/clump.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar e_1, _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.indexes = exports.tiles = void 0;\nexports.tiles = {\n    '00000000': 0,\n    '00010000': 1,\n    '00010001': 2,\n    '00000001': 3,\n    '00010100': 4,\n    '00000101': 5,\n    '01010100': 6,\n    '00010101': 7,\n    '01110101': 8,\n    '01011101': 9,\n    '11010111': 10,\n    '11110101': 11,\n    '00000100': 12,\n    '00011100': 13,\n    '00011111': 14,\n    '00000111': 15,\n    '01010000': 16,\n    '01000001': 17,\n    '01010001': 18,\n    '01000101': 19,\n    '11010101': 20,\n    '01010111': 21,\n    '01011111': 22,\n    '01111101': 23,\n    '01000100': 24,\n    '01111100': 25,\n    '11111111': 26,\n    '11000111': 27,\n    '01011100': 28,\n    '00010111': 29,\n    '01110100': 30,\n    '00011101': 31,\n    '11110111': 32,\n    '11111101': 33,\n    '01110111': 34,\n    '11011101': 35,\n    '01000000': 36,\n    '01110000': 37,\n    '11110001': 38,\n    '11000001': 39,\n    '01110001': 40,\n    '11000101': 41,\n    '11010001': 42,\n    '01000111': 43,\n    '11011111': 44,\n    '01111111': 45,\n    '01010101': 46,\n};\nvar indexesTemp = {};\ntry {\n    for (var _b = __values(Object.entries(exports.tiles)), _c = _b.next(); !_c.done; _c = _b.next()) {\n        var _d = __read(_c.value, 2), key = _d[0], value = _d[1];\n        indexesTemp[value] = key;\n    }\n}\ncatch (e_1_1) { e_1 = { error: e_1_1 }; }\nfinally {\n    try {\n        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n    }\n    finally { if (e_1) throw e_1.error; }\n}\nexports.indexes = indexesTemp;\n\n\n//# sourceURL=webpack:///./src/helpers/clump.ts?");

/***/ }),

/***/ "./src/helpers/collision-controller.ts":
/*!*********************************************!*\
  !*** ./src/helpers/collision-controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createCollisions = void 0;\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire', 'exit']);\nfunction isMonster(s) {\n    return s.includes('spider') || s.includes('lizard');\n}\nfunction isTerrain(s) {\n    return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');\n}\nfunction isNonBurn(s) {\n    return s.includes('steel') || s.includes('dirt');\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nvar createCollisions = function (game) {\n    game.matter.world.on('collisionstart', function (event) {\n        var pairs = event.pairs;\n        var _loop_1 = function (i) {\n            var bodyA = pairs[i].bodyA;\n            var bodyB = pairs[i].bodyB;\n            var a = bodyA.label;\n            var b = bodyB.label;\n            if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {\n                game.fire.destroy();\n                game.fireActive = false;\n                var lizard = a.includes('lizard') ? a : b;\n                game.lizards[lizard].ignite(game);\n            }\n            if ((a == 'exit' && b == 'player') || (b == 'exit' && a == 'player')) {\n                if (localStorage.getItem('useleveleditor') == 'false') {\n                    var currLevel = parseInt(localStorage.getItem('level'));\n                    var nextLevel = currLevel + 1;\n                    localStorage.setItem('level', nextLevel.toString());\n                }\n                game.scene.restart();\n            }\n            if ((a == 'fire' && b.includes('bomb')) || (b == 'fire' && a.includes('bomb'))) {\n                var bomb = a.includes('bomb') ? a : b;\n                game.bombs[bomb].makeExit(game);\n                game.fire.destroy();\n                game.fireActive = false;\n            }\n            if ((a == 'fire' && isTerrain(b)) || (b == 'fire' && isTerrain(a))) {\n                game.fire.destroy();\n                game.fireActive = false;\n            }\n            if ((a.includes('lizard') && b.includes('bomb')) || (b.includes('lizard') && a.includes('bomb'))) {\n                var bomb = a.includes('bomb') ? a : b;\n                var lizard = a.includes('lizard') ? a : b;\n                if (game.lizards[lizard].onFire) {\n                    game.bombs[bomb].makeExit(game);\n                }\n            }\n            if ((a.includes('lizard') && b == 'player') || (b.includes('lizard') && a == 'player')) {\n                game.scene.restart();\n            }\n            if ((a.includes('spider') && b == 'player') || (b.includes('spider') && a == 'player')) {\n                game.scene.restart();\n            }\n            if ((a.includes('crate') && b == 'player') || (b.includes('crate') && a == 'player')) {\n                var crate = a.includes('crate') ? a : b;\n                if (game.crates[crate].onFire) {\n                    game.scene.restart();\n                }\n            }\n            if ((a.includes('crate') && b.includes('player')) || (b.includes('crate') && a.includes('player'))) {\n                var crate = a.includes('crate') ? a : b;\n                if (game.crates[crate].onFire) {\n                    game.scene.restart();\n                }\n            }\n            if ((isTerrain(a) && b.includes('bomb') && bodyB.isSensor) ||\n                (isTerrain(b) && a.includes('bomb') && bodyA.isSensor)) {\n                var bomb = a.includes('bomb') ? a : b;\n                game.bombs[bomb].makeExit(game);\n            }\n            if ((a == 'playerRight' && isTerrain(b)) || (b == 'playerRight' && isTerrain(a))) {\n                game.player.hittingRight = true;\n            }\n            if ((a == 'playerLeft' && isTerrain(b)) || (b == 'playerLeft' && isTerrain(a))) {\n                game.player.hittingLeft = true;\n            }\n            if (a == 'playerTop' || b == 'playerTop') {\n                var otherBody = a !== 'playerTop' ? bodyA : bodyB;\n                if (otherBody.label != 'exit') {\n                    if (otherBody.velocity.y > 0 && game.player.sprite.body.velocity.y == 0) {\n                        game.scene.restart();\n                    }\n                    else {\n                        game.player.sprite.setVelocityY(0);\n                    }\n                }\n            }\n            if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {\n                game.fire.destroy();\n                game.fireActive = false;\n                var spider = b.includes('spider') ? b : a;\n                game.spiders[spider].hitFire();\n            }\n            if ((b.includes('lizard') && a.includes('crate')) || (a.includes('lizard') && b.includes('crate'))) {\n                var crate = a.includes('crate') ? a : b;\n                var lizard = a.includes('crate') ? b : a;\n                if (game.lizards[lizard].onFire) {\n                    game.burnQueue.add(game.crates[crate].owner);\n                }\n                if (game.crates[crate].onFire) {\n                    game.lizards[lizard].ignite(game);\n                }\n            }\n            if ((b.includes('spider') && a.includes('crate')) || (a.includes('spider') && b.includes('crate'))) {\n                var crate = a.includes('crate') ? a : b;\n                var spider = a.includes('crate') ? b : a;\n                if (game.crates[crate].onFire) {\n                    game.spiders[spider].destroy();\n                }\n            }\n            //  sensor collisions\n            if (pairs[i].isSensor) {\n                var playerBody = void 0;\n                var otherBody = void 0;\n                if (bodyA.isSensor) {\n                    playerBody = bodyA;\n                    otherBody = bodyB;\n                }\n                else if (bodyB.isSensor) {\n                    playerBody = bodyB;\n                    otherBody = bodyB;\n                }\n                if (playerBody.label === 'groundSensor' && otherBody.label != 'fire' && isTerrain(otherBody.label)) {\n                    game.player.touchingGround = true;\n                }\n            }\n            // fire collision\n            if (a === 'fire' && b.includes('crate')) {\n                game.fire.destroy();\n                game.fireActive = false;\n                game.burnQueue.add(game.crates[b].owner);\n            }\n            if (b === 'fire' && a.includes('crate')) {\n                game.burnQueue.add(game.crates[a].owner);\n            }\n            // update above section to comply with format\n            if ((a === 'fire' && b.includes('lava')) || (b === 'fire' && a.includes('lava'))) {\n                var lava = a.includes('lava') ? a : b;\n                game.lavas[lava].ignite(game, game.tiles, game.xTiles, game.yTiles);\n                game.fire.destroy();\n                game.fireActive = false;\n            }\n            if ((b.includes('spider') && a.includes('lizard')) || a.includes( true && b.includes('lizard)'))) {\n                var spider = b.includes('spider') ? b : a;\n                var lizard = b.includes('lizard') ? b : a;\n                if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {\n                    game.spiders[spider].destroy();\n                }\n            }\n            if ((isTerrain(a) && b.includes('lizTop')) || (isTerrain(b) && a.includes('lizTop'))) {\n                var lizLabel = a.includes('lizTop') ? a : b;\n                var lizId = lizLabel.substring(lizLabel.indexOf(',') + 1);\n                game.lizards['lizard' + lizId].destroy();\n            }\n            if ((isTerrain(a) && b.includes('spiTop')) || (isTerrain(b) && a.includes('spiTop'))) {\n                var spiLabel = a.includes('spiTop') ? a : b;\n                var spiId = spiLabel.substring(spiLabel.indexOf(',') + 1);\n                game.spiders['spider' + spiId].destroy();\n            }\n            if ((bodyA.isSensor && bodyA.ignoreGravity == false && isMonster(a)) ||\n                (bodyB.isSensor && bodyB.ignoreGravity == false && isMonster(b))) {\n                var monsterBody = bodyA.isSensor ? bodyA : bodyB;\n                var otherBody_1 = bodyA.isSensor ? bodyB : bodyA;\n                var turnFlag_1 = true;\n                monsterCollisionLabels.forEach(function (label) {\n                    if (otherBody_1.label.includes(label)) {\n                        turnFlag_1 = false;\n                    }\n                });\n                if (turnFlag_1) {\n                    if (monsterBody.label.includes('lizard')) {\n                        game.lizards[monsterBody.label].flip();\n                    }\n                    else {\n                        game.spiders[monsterBody.label].flip();\n                    }\n                }\n            }\n        };\n        for (var i = 0; i < pairs.length; i++) {\n            _loop_1(i);\n        }\n    });\n    game.matter.world.on('collisionend', function (event) {\n        var pairs = event.pairs;\n        for (var i = 0; i < pairs.length; i++) {\n            var bodyA = pairs[i].bodyA;\n            var bodyB = pairs[i].bodyB;\n            var a = bodyA.label;\n            var b = bodyB.label;\n            if (a == 'playerRight' || b == 'playerRight') {\n                game.player.hittingRight = false;\n            }\n            if (a == 'playerLeft' || b == 'playerLeft') {\n                game.player.hittingLeft = false;\n            }\n        }\n    });\n    game.matter.world.on('collisionactive', function (event) {\n        var e_1, _a, e_2, _b;\n        var pairs = event.pairs;\n        for (var i = 0; i < pairs.length; i++) {\n            var bodyA = pairs[i].bodyA;\n            var bodyB = pairs[i].bodyB;\n            var a = bodyA.label;\n            var b = bodyB.label;\n            if ((a == 'playerRight' && isTerrain(b)) || (b == 'playerRight' && isTerrain(b))) {\n                game.player.hittingRight = true;\n            }\n            if ((a == 'playerLeft' && isTerrain(b)) || (b == 'playerLeft' && isTerrain(b))) {\n                game.player.hittingLeft = true;\n            }\n            if ((a.includes('lizard') && b.includes('bomb')) || (b.includes('lizard') && a.includes('bomb'))) {\n                var bomb = a.includes('bomb') ? a : b;\n                var lizard = a.includes('lizard') ? a : b;\n                if (game.lizards[lizard].onFire) {\n                    game.bombs[bomb].makeExit(game);\n                }\n            }\n            if ((a.includes('crate') && b.includes('bomb')) || (b.includes('crate') && a.includes('bomb'))) {\n                var bomb = a.includes('bomb') ? a : b;\n                var crate = a.includes('crate') ? a : b;\n                if (game.crates[crate].onFire) {\n                    game.bombs[bomb].makeExit(game);\n                }\n            }\n            if (a == 'playerTop' || b == 'playerTop') {\n                var otherBody = a !== 'playerTop' ? bodyA : bodyB;\n                if (!otherBody.isStatic && otherBody.label !== 'fire') {\n                    game.scene.restart();\n                }\n                else {\n                    game.player.sprite.setVelocityY(0);\n                }\n            }\n            if ((b.includes('spider') && a.includes('lizard')) || a.includes( true && b.includes('lizard)'))) {\n                var spider = b.includes('spider') ? b : a;\n                var lizard = b.includes('lizard') ? b : a;\n                if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {\n                    game.spiders[spider].destroy();\n                }\n            }\n            if ((a.includes('crate') && b.includes('player')) || (b.includes('crate') && a.includes('player'))) {\n                var crate = a.includes('crate') ? a : b;\n                if (game.crates[crate].onFire) {\n                    game.scene.restart();\n                }\n            }\n            if (a.includes('rightEdgeL') || b.includes('rightEdgeL')) {\n                var lizard = a.includes('rightEdgeL') ? a : b;\n                //grab id number\n                var id = parseInt(lizard.substring(lizard.indexOf(',') + 1));\n                game.lizards['lizard' + id].rightEdge = true;\n            }\n            if (a.includes('leftEdgeL') || b.includes('leftEdgeL')) {\n                var lizard = a.includes('leftEdgeL') ? a : b;\n                //grab id number\n                var id = parseInt(lizard.substring(lizard.indexOf(',') + 1));\n                game.lizards['lizard' + id].leftEdge = true;\n            }\n            if (a.includes('rightEdgeS') || b.includes('rightEdgeS')) {\n                var spider = a.includes('rightEdgeS') ? a : b;\n                //grab id number\n                var id = parseInt(spider.substring(spider.indexOf(',') + 1));\n                game.spiders['spider' + id].rightEdge = true;\n            }\n            if (a.includes('lizard') && b.includes('lizard')) {\n                if (game.lizards[a].onFire) {\n                    game.lizards[b].ignite(game);\n                }\n                if (game.lizards[b].onFire) {\n                    game.lizards[a].ignite(game);\n                }\n            }\n            if (a.includes('leftEdgeS') || b.includes('leftEdgeS')) {\n                var spider = a.includes('leftEdgeS') ? a : b;\n                //grab id number\n                var id = parseInt(spider.substring(spider.indexOf(',') + 1));\n                game.spiders['spider' + id].leftEdge = true;\n            }\n        }\n        try {\n            // can probably condense the below section or combine lizard and spider object type\n            for (var _c = __values(Object.entries(game.lizards)), _d = _c.next(); !_d.done; _d = _c.next()) {\n                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];\n                if (value.rightEdge == false) {\n                    value.faceLeft();\n                    value.rightEdge = true;\n                }\n                else {\n                    value.rightEdge = false;\n                }\n                if (value.leftEdge == false) {\n                    value.faceRight();\n                    value.leftEdge = true;\n                }\n                else {\n                    value.leftEdge = false;\n                }\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n        try {\n            for (var _f = __values(Object.entries(game.spiders)), _g = _f.next(); !_g.done; _g = _f.next()) {\n                var _h = __read(_g.value, 2), key = _h[0], value = _h[1];\n                if (value.rightEdge == false) {\n                    value.flip();\n                    value.rightEdge = true;\n                }\n                else {\n                    value.rightEdge = false;\n                }\n                if (value.leftEdge == false) {\n                    value.flip();\n                    value.leftEdge = true;\n                }\n                else {\n                    value.leftEdge = false;\n                }\n            }\n        }\n        catch (e_2_1) { e_2 = { error: e_2_1 }; }\n        finally {\n            try {\n                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);\n            }\n            finally { if (e_2) throw e_2.error; }\n        }\n    });\n};\nexports.createCollisions = createCollisions;\n\n\n//# sourceURL=webpack:///./src/helpers/collision-controller.ts?");

/***/ }),

/***/ "./src/helpers/init.ts":
/*!*****************************!*\
  !*** ./src/helpers/init.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.connectorBlocks = exports.jointBlocks = exports.initAnims = void 0;\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar connector_1 = __webpack_require__(/*! ../objects/connector */ \"./src/objects/connector.ts\");\nvar initAnims = function (game) {\n    game.anims.create({\n        key: 'squareFire',\n        frames: game.anims.generateFrameNumbers('squareFire', { start: 0, end: 4 }),\n        frameRate: 60,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireball',\n        frames: game.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireDisappear',\n        frames: game.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n        frameRate: 60,\n    });\n    game.anims.create({\n        key: 'lizard',\n        frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),\n        frameRate: 60,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'left',\n        frames: game.anims.generateFrameNumbers('player', { start: 0, end: 6 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'turnLeft',\n        frames: [{ key: 'player', frame: 6 }],\n    });\n    game.anims.create({\n        key: 'shootLeft',\n        frames: game.anims.generateFrameNumbers('shoot', { start: 0, end: 4 }),\n        frameRate: 10,\n    });\n    game.anims.create({\n        key: 'shootRight',\n        frames: game.anims.generateFrameNumbers('shoot', { start: 6, end: 9 }),\n        frameRate: 10,\n    });\n    game.anims.create({\n        key: 'jumpLeft',\n        frames: [{ key: 'jump', frame: 4 }],\n        frameRate: 30,\n    });\n    game.anims.create({\n        key: 'jumpRight',\n        frames: [{ key: 'jump', frame: 5 }],\n        frameRate: 30,\n    });\n    game.anims.create({\n        key: 'fallLeft',\n        frames: game.anims.generateFrameNumbers('jump', { start: 3, end: 0 }),\n        frameRate: 30,\n    });\n    game.anims.create({\n        key: 'fallRight',\n        frames: game.anims.generateFrameNumbers('jump', { start: 4, end: 7 }),\n        frameRate: 30,\n    });\n    game.anims.create({\n        key: 'turnRight',\n        frames: [{ key: 'player', frame: 7 }],\n    });\n    game.anims.create({\n        key: 'right',\n        frames: game.anims.generateFrameNumbers('player', { start: 7, end: 12 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spider',\n        frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 5 }),\n        frameRate: 20,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spiderArmored',\n        frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 5 }),\n        frameRate: 20,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'explosion',\n        frames: game.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),\n        frameRate: 30,\n        hideOnComplete: true,\n    });\n};\nexports.initAnims = initAnims;\nfunction makeJoint(game, ax, ay, bx, by, body1, body2) {\n    game.matter.add.joint(body1, body2, 0, 1, {\n        pointA: { x: ax, y: ay },\n        pointB: { x: bx, y: by },\n        angularStiffness: 1,\n        stiffness: 1,\n        damping: 1,\n    });\n}\nvar jointBlocks = function (game, blocks, data) {\n    var track = new Set();\n    var items = [];\n    data.steel.forEach(function (e) { return items.push(e); });\n    data.crate.forEach(function (e) { return items.push(e); });\n    data.lava.forEach(function (e) { return items.push(e); });\n    items.forEach(function (e) {\n        track.add(blocks[e.x + ',' + e.y]);\n        var sprite = blocks[e.x + ',' + e.y].sprite;\n        var id = clump_1.indexes[e.frame];\n        // odd numbers are sides\n        var sides = id.split('');\n        var upId = e.x + ',' + (e.y - 50);\n        var rightId = e.x + 50 + ',' + e.y;\n        var downId = e.x + ',' + (e.y + 50);\n        var leftId = e.x - 50 + ',' + e.y;\n        var upJId = e.x + ',' + (e.y - 25);\n        var rightJId = e.x + 25 + ',' + e.y;\n        var downJId = e.x + ',' + (e.y + 25);\n        var leftJId = e.x - 25 + ',' + e.y;\n        if (sides[1] == 1 && !track.has(upJId)) {\n            var up = blocks[upId];\n            // for (let p = -24; p < 25; p += 4) {\n            //   makeJoint(game, p, -25, p, 25, sprite.body, up.sprite.body);\n            // }\n            makeJoint(game, 0, -25, 0, 25, sprite.body, up.sprite.body);\n            track.add(upJId);\n        }\n        if (sides[3] == 1 && !track.has(rightJId)) {\n            var right = blocks[rightId];\n            // for (let p = -24; p < 25; p += 4) {\n            //   makeJoint(game, 25, p, -25, p, sprite.body, right.sprite.body);\n            // }\n            makeJoint(game, 25, 0, -25, 0, sprite.body, right.sprite.body);\n            track.add(rightJId);\n        }\n        if (sides[5] == 1 && !track.has(downJId)) {\n            var down = blocks[downId];\n            // for (let p = -24; p < 25; p += 4) {\n            //   makeJoint(game, p, 25, p, -25, sprite.body, down.sprite.body);\n            // }\n            makeJoint(game, 0, 25, 0, -25, sprite.body, down.sprite.body);\n            track.add(downJId);\n        }\n        if (sides[7] == 1 && !track.has(leftJId)) {\n            var left = blocks[leftId];\n            // for (let p = -24; p < 25; p += 4) {\n            //   makeJoint(game, -25, p, 25, p, sprite.body, left.sprite.body);\n            // }\n            makeJoint(game, -25, 0, 25, 0, sprite.body, left.sprite.body);\n            track.add(leftJId);\n        }\n    });\n};\nexports.jointBlocks = jointBlocks;\nvar connectorBlocks = function (game, blocks, data) {\n    data.connector.forEach(function (e) {\n        var x = parseInt(e.substring(0, e.indexOf(',')));\n        var y = parseInt(e.substring(e.indexOf(',') + 1));\n        if (x % 50 == 0) {\n            var leftBlock = blocks[x - 25 + ',' + y];\n            var rightBlock = blocks[x + 25 + ',' + y];\n            new connector_1.default(leftBlock, rightBlock, game);\n            leftBlock.right = rightBlock;\n            rightBlock.left = leftBlock;\n        }\n        else {\n            var upBlock = blocks[x + ',' + (y - 25)];\n            var downBlock = blocks[x + ',' + (y + 25)];\n            new connector_1.default(upBlock, downBlock, game);\n            downBlock.up = upBlock;\n            upBlock.down = downBlock;\n        }\n    });\n};\nexports.connectorBlocks = connectorBlocks;\n\n\n//# sourceURL=webpack:///./src/helpers/init.ts?");

/***/ }),

/***/ "./src/helpers/levelEditorButton.ts":
/*!******************************************!*\
  !*** ./src/helpers/levelEditorButton.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\n// function handleUpload(e) {\n//   const reader = new FileReader();\n//   reader.readAsText(e.target.files[0]);\n//   reader.onload = function (json) {\n//     localStorage.set('leveleditorlevel', JSON.parse(JSON.stringify(json)));\n//   };\n// }\n// const loader = document.getElementById('levelLoader');\n// loader.addEventListener('change', handleUpload, false);\nvar LevelEditorButton = /** @class */ (function () {\n    function LevelEditorButton(x, y, text, color, select, game) {\n        var _this = this;\n        function handleUpload(e) {\n            localStorage.setItem('upload', 'true');\n            var reader = new FileReader();\n            reader.readAsText(e.target.files[0]);\n            reader.onload = function (json) {\n                localStorage.setItem('leveleditorlevel', JSON.parse(JSON.stringify(json.target.result)));\n                game.scene.restart();\n            };\n        }\n        var loader = document.getElementById('levelLoader');\n        loader.addEventListener('change', handleUpload, false);\n        var button = new menu_button_1.MenuButton(game, x, y, text, function () {\n            if (select == 'start') {\n                game.generateJson(true);\n            }\n            else if (select == 'download') {\n                game.generateJson(false);\n            }\n            else if (select == 'upload') {\n                loader.click();\n            }\n            else {\n                game.selected = select;\n            }\n            game.buttons.forEach(function (e) {\n                e.reset();\n            });\n            _this.button.pressed = true;\n            _this.button.enterMenuButtonActiveState();\n        }, 75, 10, 10);\n        button.on('pointerover', function () {\n            game.onButton = true;\n        });\n        // button.on('pointerdown', () => {\n        //   if (select == 'download') {\n        //     game.generateJson();\n        //   } else {\n        //     game.selected = select;\n        //   }\n        // });\n        button.on('pointerout', function () {\n            game.onButton = false;\n        });\n        button.setDepth(1);\n        this.button = button;\n    }\n    LevelEditorButton.prototype.reset = function () {\n        this.button.pressed = false;\n        this.button.enterMenuButtonRestState();\n    };\n    return LevelEditorButton;\n}());\nexports.default = LevelEditorButton;\n\n\n//# sourceURL=webpack:///./src/helpers/levelEditorButton.ts?");

/***/ }),

/***/ "./src/helpers/levelSizeButton.ts":
/*!****************************************!*\
  !*** ./src/helpers/levelSizeButton.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar LevelSizeButton = /** @class */ (function () {\n    function LevelSizeButton(x, y, type, game) {\n        var _this = this;\n        this.upPressed = false;\n        this.downPressed = false;\n        function handleUpload(e) {\n            localStorage.setItem('upload', 'true');\n            var reader = new FileReader();\n            reader.readAsText(e.target.files[0]);\n            reader.onload = function (json) {\n                localStorage.setItem('leveleditorlevel', JSON.stringify(json.target.result));\n                game.scene.restart();\n            };\n        }\n        var loader = document.getElementById('levelLoader');\n        loader.addEventListener('change', handleUpload, false);\n        var button = new menu_button_1.MenuButton(game, x + 20, y, type + ':' + game[type], function () {\n            game.generateJson(false, true);\n        }, 50, 10, 10);\n        var up = new menu_button_1.MenuButton(game, x, y, '+', function () {\n            game[type] += 1;\n            button.label.text = type + ':' + game[type];\n            game.buttons.forEach(function (e) {\n                e.reset();\n            });\n            up.pressed = true;\n            up.enterMenuButtonActiveState();\n        }, 20, 20, 10, false);\n        var down = new menu_button_1.MenuButton(game, x, y + 10, '-', function () {\n            game[type] -= 1;\n            button.label.text = type + ':' + game[type];\n            game.buttons.forEach(function (e) {\n                e.reset();\n            });\n            down.pressed = true;\n            down.enterMenuButtonActiveState();\n        }, 20, 20, 10, false);\n        // game.input.setPollAlways();\n        button.on('pointerover', function () {\n            game.onButton = true;\n        });\n        button.on('pointerout', function () {\n            game.onButton = false;\n        });\n        up.on('pointerover', function () {\n            game.onButton = true;\n        });\n        up.on('pointerout', function () {\n            game.onButton = false;\n        });\n        // up.on('pointerdown', () => {\n        //   this.upPressed = true;\n        //   while (this.upPressed) {\n        //     setTimeout(() => {\n        //       game[type] += 1;\n        //       button.label.text = type + ':' + game[type];\n        //     }, 1000);\n        //   }\n        // });\n        up.on('pointerup', function () {\n            up.enterMenuButtonRestState();\n            _this.upPressed = false;\n        });\n        down.on('pointerover', function () {\n            game.onButton = true;\n        });\n        down.on('pointerout', function () {\n            game.onButton = false;\n        });\n        // down.on('pointerdown', () => {\n        //   this.downPressed = true;\n        //   while (this.downPressed) {\n        //     game[type] -= 1;\n        //     button.label.text = type + ':' + game[type];\n        //   }\n        // });\n        down.on('pointerup', function () {\n            down.enterMenuButtonRestState();\n            _this.downPressed = false;\n        });\n        up.setDepth(1);\n        down.setDepth(1);\n        button.setDepth(1);\n        this.button = button;\n        this.up = up;\n        this.down = down;\n    }\n    LevelSizeButton.prototype.reset = function () {\n        this.button.pressed = false;\n        this.button.enterMenuButtonRestState();\n        this.up.pressed = false;\n        this.up.enterMenuButtonRestState();\n        this.down.pressed = false;\n        this.down.enterMenuButtonRestState();\n    };\n    return LevelSizeButton;\n}());\nexports.default = LevelSizeButton;\n\n\n//# sourceURL=webpack:///./src/helpers/levelSizeButton.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.game = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar scenes_1 = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\nvar gameConfig = {\n    title: 'Pyrokid',\n    type: Phaser.AUTO,\n    scale: {\n        width: 800,\n        height: 600,\n    },\n    scene: scenes_1.default,\n    physics: {\n        default: 'matter',\n        matter: {\n            enableSleeping: false,\n            debug: true,\n        },\n    },\n    parent: 'game',\n    backgroundColor: '#000000',\n};\nexports.game = new Phaser.Game(gameConfig);\nwindow.addEventListener('resize', function () {\n    exports.game.scale.refresh();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/objects/bomb.ts":
/*!*****************************!*\
  !*** ./src/objects/bomb.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar exit_1 = __webpack_require__(/*! ./exit */ \"./src/objects/exit.ts\");\nvar Bomb = /** @class */ (function () {\n    function Bomb(x, y, id, game) {\n        var rec = game.matter.bodies.rectangle(0, 0, 35, 35, {\n            label: 'bomb' + id,\n            inertia: Infinity,\n        });\n        var bombTop = game.matter.bodies.rectangle(0, -17, 10, 2, { isSensor: true, label: 'bomb' + id });\n        var compound = game.matter.body.create({\n            parts: [rec, bombTop],\n            inertia: Infinity,\n            label: 'bomb' + id,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        this.sprite = game.matter.add.sprite(x, y, 'bomb', null, {\n            label: 'bomb' + id,\n        });\n        this.sprite.setExistingBody(compound);\n        this.sprite.setPosition(x, y);\n        //collides with lizardcollisionsensors and normal blocks\n        this.sprite.setCollisionCategory(0x100000);\n        this.sprite.setCollidesWith(0x1100);\n        this.sprite.setFixedRotation();\n        this.sprite.setBounce(0);\n    }\n    Bomb.prototype.makeExit = function (game) {\n        if (this.sprite.active) {\n            new exit_1.default(this.sprite.x, this.sprite.y, game);\n            var explosion = game.add.sprite(this.sprite.x, this.sprite.y, 'explosion');\n            explosion.anims.play('explosion');\n            this.sprite.destroy();\n        }\n        //TODO: PLAY EXPLOSION ANIMATION\n    };\n    return Bomb;\n}());\nexports.default = Bomb;\n\n\n//# sourceURL=webpack:///./src/objects/bomb.ts?");

/***/ }),

/***/ "./src/objects/compound.ts":
/*!*********************************!*\
  !*** ./src/objects/compound.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Compound = /** @class */ (function () {\n    function Compound(game, blocks) {\n        var _this = this;\n        // this.sprite = game.matter.add.sprite(0, 0, image, 0, { label: label });\n        this.blocks = blocks;\n        // const crateBodies = [];\n        var test = [];\n        blocks.forEach(function (e) {\n            // crateBodies.push(e.sprite);\n            e.owner = _this;\n            test.push(e.sprite.body);\n        });\n        this.onFire = false;\n    }\n    Compound.prototype.setAllGrounded = function (game) {\n        this.blocks.forEach(function (block) {\n            block.setGrounded();\n        });\n        this.getConnected(game).forEach(function (connectedBlock) {\n            connectedBlock.setGrounded();\n        });\n    };\n    Compound.prototype.setAboveDynamic = function (game) {\n        this.blocks.forEach(function (block) {\n            block.setGrounded();\n        });\n    };\n    Compound.prototype.getConnected = function (game) {\n        var connectedBlocks = new Set();\n        this.blocks.forEach(function (block) {\n            block.getConnected(connectedBlocks, game).forEach(function (e) {\n                connectedBlocks.add(e);\n            });\n        });\n        return connectedBlocks;\n    };\n    return Compound;\n}());\nexports.default = Compound;\n\n\n//# sourceURL=webpack:///./src/objects/compound.ts?");

/***/ }),

/***/ "./src/objects/connector.ts":
/*!**********************************!*\
  !*** ./src/objects/connector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar crate_1 = __webpack_require__(/*! ./crate */ \"./src/objects/crate.ts\");\nvar Connector = /** @class */ (function () {\n    function Connector(obj1, obj2, game) {\n        var x1 = obj1.sprite.x;\n        var x2 = obj2.sprite.x;\n        var y1 = obj1.sprite.y;\n        var y2 = obj2.sprite.y;\n        var posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;\n        var posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;\n        var connector = game.matter.add.image(x2 + (x1 - x2) / 2, y2 + (y1 - y2) / 2, 'connector', null, {\n            isSensor: true,\n            ignoreGravity: true,\n        });\n        var constraints = [];\n        var px = x2 - x1 == 0;\n        var py = y2 - y1 == 0;\n        for (var p = 0; p < 1; p += 4) {\n            constraints.push(game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {\n                pointA: { x: px ? p : (x2 - x1) / 2, y: py ? p : (y2 - y1) / 2 },\n                pointB: { x: px ? p : (x1 - x2) / 2, y: py ? p : (y1 - y2) / 2 },\n                angularStiffness: 1,\n                stiffness: 1,\n            }));\n        }\n        this.constraints = constraints;\n        if (x2 - x1 == 0) {\n            connector.angle = 90;\n        }\n        this.connectorPin = game.matter.add.joint(obj1.sprite.body, connector.body, 0, 1, {\n            pointA: { x: 0, y: 0 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n            stiffness: 1,\n        });\n        this.sprite = connector;\n        if (obj1 instanceof crate_1.default) {\n            obj1.connectors.add(this);\n        }\n        if (obj2 instanceof crate_1.default) {\n            obj2.connectors.add(this);\n        }\n    }\n    Connector.prototype.destroy = function (game) {\n        this.sprite.destroy();\n        this.constraints.forEach(function (e) {\n            game.matter.world.removeConstraint(e);\n        });\n        game.matter.world.removeConstraint(this.connectorPin);\n    };\n    return Connector;\n}());\nexports.default = Connector;\n\n\n//# sourceURL=webpack:///./src/objects/connector.ts?");

/***/ }),

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar terrain_1 = __webpack_require__(/*! ./terrain */ \"./src/objects/terrain.ts\");\nvar Crate = /** @class */ (function (_super) {\n    __extends(Crate, _super);\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame, isLava) {\n        if (frame === void 0) { frame = 0; }\n        var _this = _super.call(this) || this;\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var imageString = isLava ? 'lava' : 'crate';\n        var crate = game.matter.add.sprite(x, y, imageString, frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        crate.setFriction(1);\n        crate.setFrictionStatic(100);\n        crate.setName('crate' + id);\n        _this.sprite = crate;\n        _this.onFire = false;\n        _this.fireSprite = null;\n        _this.connectors = new Set();\n        _this.isLava = isLava;\n        return _this;\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function (game) {\n        if (!this.isLava && this.sprite.active) {\n            this.sprite.destroy();\n            this.connectors.forEach(function (e) {\n                e.destroy(game);\n            });\n        }\n    };\n    return Crate;\n}(terrain_1.default));\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ }),

/***/ "./src/objects/dirt.ts":
/*!*****************************!*\
  !*** ./src/objects/dirt.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar compound_1 = __webpack_require__(/*! ./compound */ \"./src/objects/compound.ts\");\nvar terrain_1 = __webpack_require__(/*! ./terrain */ \"./src/objects/terrain.ts\");\nvar Dirt = /** @class */ (function (_super) {\n    __extends(Dirt, _super);\n    function Dirt(x, y, game, frame) {\n        var _this = _super.call(this) || this;\n        var sprite = game.matter.add.sprite(x, y, 'dirt', frame, { isStatic: true, label: 'dirt' });\n        sprite.setPosition(x, y);\n        sprite.setStatic(true);\n        sprite.setCollisionCategory(0x0100);\n        sprite.setBounce(0);\n        sprite.setFriction(1);\n        sprite.setFrictionStatic(1);\n        sprite.setName('dirt');\n        _this.sprite = sprite;\n        _this.owner = new compound_1.default(game, new Set()); // doesnt have anything in it bc its just dirt\n        _this.owner.blocks.add(_this);\n        return _this;\n    }\n    return Dirt;\n}(terrain_1.default));\nexports.default = Dirt;\n\n\n//# sourceURL=webpack:///./src/objects/dirt.ts?");

/***/ }),

/***/ "./src/objects/enemy.ts":
/*!******************************!*\
  !*** ./src/objects/enemy.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Enemy = /** @class */ (function () {\n    function Enemy() {\n    }\n    Enemy.prototype.flip = function () {\n        this.sprite.flipX = !this.sprite.flipX;\n        this.velocity = -this.velocity;\n    };\n    Enemy.prototype.faceLeft = function () {\n        this.sprite.flipX = true;\n        this.velocity = -Math.abs(this.velocity);\n    };\n    Enemy.prototype.faceRight = function () {\n        this.sprite.flipX = false;\n        this.velocity = Math.abs(this.velocity);\n    };\n    Enemy.prototype.syncSensor = function () {\n        if (this.sprite.active) {\n            this.collisionSensor.setPosition(this.sprite.x, this.sprite.y);\n        }\n    };\n    Enemy.prototype.destroy = function () {\n        this.sprite.destroy();\n        this.collisionSensor.destroy();\n    };\n    Enemy.prototype.update = function () {\n        if (this.sprite.active) {\n            this.syncSensor();\n            this.sprite.setVelocityX(this.velocity);\n        }\n    };\n    return Enemy;\n}());\nexports.default = Enemy;\n\n\n//# sourceURL=webpack:///./src/objects/enemy.ts?");

/***/ }),

/***/ "./src/objects/exit.ts":
/*!*****************************!*\
  !*** ./src/objects/exit.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Exit = /** @class */ (function () {\n    function Exit(x, y, game) {\n        var circle = game.matter.bodies.circle(x, y, 20, {\n            isSensor: true,\n            label: 'exit',\n            ignoreGravity: true,\n        });\n        this.sprite = game.matter.add.sprite(x, y, 'exit', null, {\n            isSensor: true,\n            label: 'exit',\n            ignoreGravity: true,\n        });\n        this.sprite.setExistingBody(circle);\n        this.sprite.setDepth(-1);\n        this.sprite.setCollisionCategory(0x0100);\n    }\n    Exit.prototype.getX = function () {\n        return this.sprite.body.position.x;\n    };\n    Exit.prototype.getY = function () {\n        return this.sprite.body.position.y;\n    };\n    return Exit;\n}());\nexports.default = Exit;\n\n\n//# sourceURL=webpack:///./src/objects/exit.ts?");

/***/ }),

/***/ "./src/objects/lizard.ts":
/*!*******************************!*\
  !*** ./src/objects/lizard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar enemy_1 = __webpack_require__(/*! ./enemy */ \"./src/objects/enemy.ts\");\nvar Lizard = /** @class */ (function (_super) {\n    __extends(Lizard, _super);\n    function Lizard(x, y, game, id) {\n        var _this = _super.call(this) || this;\n        var lizRight = game.matter.bodies.rectangle(15, 0, 10, 10, { isSensor: true, label: 'lizard' + id });\n        var lizRightEdge = game.matter.bodies.rectangle(17, 25, 3, 10, { isSensor: true, label: 'rightEdgeL,' + id });\n        var lizLeft = game.matter.bodies.rectangle(-15, 0, 10, 10, { isSensor: true, label: 'lizard' + id });\n        var lizLeftEdge = game.matter.bodies.rectangle(-17, 25, 3, 10, { isSensor: true, label: 'leftEdgeL,' + id });\n        var lizTop = game.matter.bodies.rectangle(0, -20, 30, 2, { isSensor: true, label: 'lizTop,' + id });\n        var lizardBody = game.matter.bodies.rectangle(0, 0, 35, 40, { label: 'lizard' + id });\n        // const collisionBody = game.matter.bodies.rectangle(0, 0, 1, 40, { isSensor: true, label: 'lizard' + id });\n        _this.collisionSensor = game.matter.add.sprite(0, 0, 'lizard', null, {\n            isSensor: true,\n            label: 'lizard' + id,\n            ignoreGravity: true,\n        });\n        _this.collisionSensor.alpha = 0;\n        // const spiderSensor = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });\n        var compound = game.matter.body.create({\n            parts: [lizardBody, lizRight, lizLeftEdge, lizRightEdge, lizLeft, lizTop],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        _this.velocity = 0.5;\n        var lizard = game.matter.add.sprite(0, 0, 'lizard');\n        lizard.scaleX = 0.7;\n        lizard.setExistingBody(compound);\n        lizard.setPosition(x, y);\n        lizard.setCollisionCategory(0x001);\n        lizard.setCollidesWith(0x0100);\n        _this.collisionSensor.setCollisionCategory(0x1000);\n        _this.collisionSensor.setCollidesWith(0x101000);\n        _this.collisionSensor.scaleX = 0.7;\n        // lizLeft.collisionFilter.category = 0x0100;\n        _this.sprite = lizard;\n        _this.onFire = false;\n        _this.fireSprite = null;\n        _this.sprite.anims.play('lizard', true);\n        _this.rightEdge = false;\n        _this.leftEdge = false;\n        return _this;\n    }\n    Lizard.prototype.ignite = function (game) {\n        if (this.onFire) {\n            return;\n        }\n        this.onFire = true;\n        this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');\n        this.fireSprite.play('squareFire', false);\n        this.fireSprite.alpha = 0.7;\n    };\n    Lizard.prototype.syncFire = function () {\n        if (this.onFire) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Lizard.prototype.update = function () {\n        if (this.sprite.active) {\n            _super.prototype.update.call(this);\n            this.syncFire();\n        }\n    };\n    return Lizard;\n}(enemy_1.default));\nexports.default = Lizard;\n\n\n//# sourceURL=webpack:///./src/objects/lizard.ts?");

/***/ }),

/***/ "./src/objects/player.ts":
/*!*******************************!*\
  !*** ./src/objects/player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Player = /** @class */ (function () {\n    function Player(x, y, game) {\n        var rec = game.matter.bodies.rectangle(0, 21, 10, 1, { isSensor: true, label: 'groundSensor' });\n        var recRight = game.matter.bodies.rectangle(16, 0, 15, 27, { isSensor: true, label: 'playerRight' });\n        var recLeft = game.matter.bodies.rectangle(-16, 0, 15, 27, { isSensor: true, label: 'playerLeft' });\n        var recTop = game.matter.bodies.rectangle(0, -15, 10, 5, { isSensor: true, label: 'playerTop' });\n        var playerBody = game.matter.bodies.rectangle(0, 0, 20, 30, { label: 'player' });\n        var compound = game.matter.body.create({\n            parts: [playerBody, rec, recRight, recLeft, recTop],\n            inertia: Infinity,\n            label: 'player',\n            render: { sprite: { xOffset: 0.5, yOffset: 0.6 } },\n        });\n        var player = game.matter.add.sprite(0, 0, 'player', { label: 'player' });\n        player.setExistingBody(compound);\n        player.setFriction(0);\n        player.body.render.sprite.xOffset = 0;\n        player.body.render.sprite.yOffset = 0;\n        player.setPosition(x, y);\n        player.setCollisionCategory(0x1000);\n        player.setCollidesWith(0x1100);\n        player.label = 'player';\n        this.sprite = player;\n        this.hittingLeft = false;\n        this.hittingRight = false;\n    }\n    Player.prototype.moveLeft = function () {\n        if (this.hittingLeft) {\n            this.sprite.setVelocityX(0);\n        }\n        else {\n            this.sprite.setVelocityX(-3);\n        }\n        this.sprite.anims.play('left', true);\n    };\n    Player.prototype.moveRight = function () {\n        if (this.hittingRight) {\n            this.sprite.setVelocityX(0);\n        }\n        else {\n            this.sprite.setVelocityX(3);\n        }\n        this.sprite.anims.play('right', true);\n    };\n    Player.prototype.turn = function () {\n        this.sprite.setVelocityX(0);\n        var currAnim = this.sprite.anims.getName().toLowerCase();\n        if (currAnim.includes('jump')) {\n            return;\n        }\n        else if (currAnim.includes('left')) {\n            this.sprite.anims.play('turnLeft');\n        }\n        else {\n            this.sprite.anims.play('turnRight');\n        }\n    };\n    Player.prototype.shoot = function (direction) {\n        var currAnim = this.sprite.anims.getName().toLowerCase();\n        if (direction == 'left') {\n            this.sprite.anims.play('shootLeft');\n        }\n        else if (direction == 'right') {\n            this.sprite.anims.play('shootRight');\n        }\n        else {\n            if (currAnim.includes('left')) {\n                this.sprite.anims.play('shootLeft');\n            }\n            else {\n                this.sprite.anims.play('shootRight');\n            }\n        }\n    };\n    Player.prototype.jump = function () {\n        this.sprite.setVelocityY(-9);\n        this.touchingGround = false;\n        // const currAnim = this.sprite.anims.getName().toLowerCase();\n        // if (currAnim.includes('left')) {\n        //   this.sprite.anims.play('jumpLeft', true);\n        // } else {\n        //   this.sprite.anims.play('jumpRight', true);\n        // }\n    };\n    Player.prototype.getX = function () {\n        return this.sprite.body.position.x;\n    };\n    Player.prototype.getY = function () {\n        return this.sprite.body.position.y;\n    };\n    return Player;\n}());\nexports.default = Player;\n\n\n//# sourceURL=webpack:///./src/objects/player.ts?");

/***/ }),

/***/ "./src/objects/spider.ts":
/*!*******************************!*\
  !*** ./src/objects/spider.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar enemy_1 = __webpack_require__(/*! ./enemy */ \"./src/objects/enemy.ts\");\nvar Spider = /** @class */ (function (_super) {\n    __extends(Spider, _super);\n    function Spider(x, y, game, id, armored) {\n        var _this = _super.call(this) || this;\n        var spiderRight = game.matter.bodies.rectangle(20, 0, 10, 10, { isSensor: true, label: 'spider' + id });\n        var spiderLeft = game.matter.bodies.rectangle(-20, 0, 10, 10, { isSensor: true, label: 'spider' + id });\n        var spiRightEdge = game.matter.bodies.rectangle(17, 25, 3, 10, { isSensor: true, label: 'rightEdgeS,' + id });\n        var spiLeftEdge = game.matter.bodies.rectangle(-17, 25, 3, 10, { isSensor: true, label: 'leftEdgeS,' + id });\n        var spiderTop = game.matter.bodies.rectangle(0, -22, 30, 2, { isSensor: true, label: 'spiTop,' + id });\n        _this.collisionSensor = game.matter.add.sprite(0, 0, 'spider', null, {\n            isSensor: true,\n            label: 'spider' + id,\n            ignoreGravity: true,\n        });\n        _this.collisionSensor.setCollisionCategory(0x1000);\n        _this.collisionSensor.setCollidesWith(0x1000);\n        _this.collisionSensor.alpha = 0;\n        // spiderLeft.collisionFilter.category = 0x0100;\n        var spiderBody = game.matter.bodies.rectangle(0, 0, 35, 40, { label: 'spider' + id });\n        var compound = game.matter.body.create({\n            parts: [spiderBody, spiderRight, spiRightEdge, spiLeftEdge, spiderLeft, spiderTop],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        _this.velocity = 1.5;\n        var spider = game.matter.add.sprite(0, 0, 'spider');\n        spider.scaleX = 0.7;\n        spider.scaleY = 0.9;\n        spider.setCollisionCategory(0x0001);\n        spider.setExistingBody(compound);\n        spider.setPosition(x, y);\n        spider.setCollidesWith(0x0100);\n        _this.collisionSensor.scaleX = 0.7;\n        _this.collisionSensor.scaleY = 0.8;\n        _this.sprite = spider;\n        _this.rightEdge = false;\n        _this.rightEdge = true;\n        if (armored) {\n            _this.sprite.anims.play('spiderArmored', true);\n            _this.armored = true;\n        }\n        else {\n            _this.sprite.anims.play('spider', true);\n        }\n        return _this;\n    }\n    Spider.prototype.hitFire = function () {\n        if (this.armored) {\n            this.armored = false;\n            var lastIndex = this.sprite.anims.currentFrame.index;\n            this.sprite.anims.play({ key: 'spider', startFrame: lastIndex - 1 });\n            //change sprite\n        }\n        else {\n            this.armored = false;\n            this.destroy();\n        }\n    };\n    return Spider;\n}(enemy_1.default));\nexports.default = Spider;\n\n\n//# sourceURL=webpack:///./src/objects/spider.ts?");

/***/ }),

/***/ "./src/objects/steel.ts":
/*!******************************!*\
  !*** ./src/objects/steel.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar terrain_1 = __webpack_require__(/*! ./terrain */ \"./src/objects/terrain.ts\");\nvar Steel = /** @class */ (function (_super) {\n    __extends(Steel, _super);\n    function Steel(x, y, game, frame) {\n        var _this = _super.call(this) || this;\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            inertia: Infinity,\n            label: 'steel',\n        });\n        var steel = game.matter.add.sprite(x, y, 'steel', frame, { label: 'steel' });\n        steel.setExistingBody(rec);\n        steel.setCollisionCategory(0x0100);\n        steel.setPosition(x, y);\n        steel.setBounce(0);\n        _this.sprite = steel;\n        return _this;\n    }\n    return Steel;\n}(terrain_1.default));\nexports.default = Steel;\n\n\n//# sourceURL=webpack:///./src/objects/steel.ts?");

/***/ }),

/***/ "./src/objects/terrain.ts":
/*!********************************!*\
  !*** ./src/objects/terrain.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar Terrain = /** @class */ (function () {\n    function Terrain() {\n    }\n    Terrain.prototype.setGrounded = function () {\n        if (this.sprite.active && !this.sprite.isStatic()) {\n            this.sprite.setStatic(true);\n            var _a = __read(helpers_1.getTileCenter(this.sprite.x, this.sprite.y), 2), px = _a[0], py = _a[1];\n            this.sprite.setPosition(px, py);\n            //to debug\n            this.sprite.setTint(0xff0000);\n        }\n    };\n    Terrain.prototype.getConnected = function (connectedBlocks, game) {\n        var directions = ['left', 'right', 'up', 'down'];\n        // const connected: Set<Terrain> = new Set<Terrain>();\n        for (var i = 0; i < directions.length; i++) {\n            var dir = directions[i];\n            if (this[dir] &&\n                this[dir].sprite.active &&\n                !connectedBlocks.has(this[dir]) &&\n                !this.owner.blocks.has(this[dir]) &&\n                !game.destroyQueue.has(this[dir])) {\n                console.log(this[dir]);\n                this[dir].owner.blocks.forEach(function (ownedBlock) {\n                    connectedBlocks.add(ownedBlock);\n                    ownedBlock.getConnected(connectedBlocks, game);\n                });\n            }\n        }\n        return connectedBlocks;\n    };\n    return Terrain;\n}());\nexports.default = Terrain;\n\n\n//# sourceURL=webpack:///./src/objects/terrain.ts?");

/***/ }),

/***/ "./src/scenes/boot-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BootScene = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Boot',\n};\n/**\n * The initial scene that loads all necessary assets to the game and displays a loading bar.\n */\nvar BootScene = /** @class */ (function (_super) {\n    __extends(BootScene, _super);\n    function BootScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    BootScene.prototype.preload = function () {\n        var _this = this;\n        var halfWidth = helpers_1.getGameWidth(this) * 0.5;\n        var halfHeight = helpers_1.getGameHeight(this) * 0.5;\n        var progressBarHeight = 100;\n        var progressBarWidth = 400;\n        var progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);\n        var progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);\n        var loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);\n        var percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);\n        var assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);\n        this.load.on('progress', function (value) {\n            progressBar.width = (progressBarWidth - 30) * value;\n            var percent = value * 100;\n            percentText.setText(percent + \"%\");\n        });\n        this.load.on('fileprogress', function (file) {\n            assetText.setText(file.key);\n        });\n        this.load.on('complete', function () {\n            loadingText.destroy();\n            percentText.destroy();\n            assetText.destroy();\n            progressBar.destroy();\n            progressBarContainer.destroy();\n            _this.scene.start('MainMenu');\n        });\n        this.loadAssets();\n    };\n    /**\n     * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)\n     * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene\n     * is currently active, so they can be accessed anywhere.\n     */\n    BootScene.prototype.loadAssets = function () {\n        // Load sample assets\n        // Source: Open Game Art\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.image('bomb', 'assets/bomb.png');\n        this.load.image('backgroundDirt', 'assets/backgrounds/level-editor.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('screenfireball', 'assets/player/fireball.png', { frameWidth: 59, frameHeight: 59 });\n        this.load.spritesheet('player', 'assets/player/player.png', { frameWidth: 60, frameHeight: 60 });\n        this.load.spritesheet('shoot', 'assets/player/shoot.png', { frameWidth: 59, frameHeight: 59 });\n        this.load.spritesheet('jump', 'assets/player/jump.png', { frameWidth: 59, frameHeight: 59 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n        this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 150, frameHeight: 150 });\n        this.load.image('exit', 'assets/exit.png');\n        this.load.image('connector', 'assets/connector.png');\n    };\n    return BootScene;\n}(Phaser.Scene));\nexports.BootScene = BootScene;\n\n\n//# sourceURL=webpack:///./src/scenes/boot-scene.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar exit_1 = __webpack_require__(/*! ../objects/exit */ \"./src/objects/exit.ts\");\nvar init_1 = __webpack_require__(/*! ../helpers/init */ \"./src/helpers/init.ts\");\nvar collision_controller_1 = __webpack_require__(/*! ../helpers/collision-controller */ \"./src/helpers/collision-controller.ts\");\nvar bomb_1 = __webpack_require__(/*! ../objects/bomb */ \"./src/objects/bomb.ts\");\nvar Helpers = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar cursors;\nvar wasdr;\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = {};\n        _this.spiders = {};\n        _this.lavas = {};\n        _this.crates = {};\n        _this.bombs = {};\n        _this.fireActive = false;\n        _this.fireCooldown = false;\n        _this.tiles = [];\n        _this.blocks = {};\n        _this.TILE_SIZE = 50;\n        _this.xTiles = 0;\n        _this.yTiles = 0;\n        _this.burnQueue = new Set();\n        _this.destroyQueue = new Set();\n        _this.dynamicBlockQueue = new Set();\n        // static block queue must preserve order due to checking lower blocks before higher blocks\n        _this.staticBlockQueue = new Set();\n        // public compounds = {};\n        _this.level = 'level' + localStorage.getItem('level');\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    GameScene.prototype.create = function () {\n        var _this = this;\n        //this.mover = this.matter.add.sprite(300, 500, 'lizard');\n        this.burnQueue.clear();\n        this.destroyQueue.clear();\n        this.dynamicBlockQueue.clear();\n        this.staticBlockQueue.clear();\n        init_1.initAnims(this);\n        var data = localStorage.getItem('useleveleditor') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('level' + localStorage.getItem('level'));\n        var world_bound_width = data.width * this.TILE_SIZE;\n        var world_bound_height = data.height * this.TILE_SIZE;\n        var background = this.add.tileSprite(world_bound_width / 2, world_bound_height / 2, world_bound_width, world_bound_height, 'backgroundDirt');\n        // background.setScale(world_bound_width / background.width);\n        background.setDepth(-10);\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.matter.world.updateWall(false, 'bottom');\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        this.xTiles = data.height;\n        this.yTiles = data.width;\n        this.fire = null;\n        this.fireActive = false;\n        this.fireCooldown = false;\n        this.tiles = [];\n        for (var i = 0; i < this.yTiles; i++) {\n            var row = [];\n            for (var j = 0; j < this.xTiles; j++) {\n                row.push(new Set());\n            }\n            this.tiles.push(row);\n        }\n        this.player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(this.player.sprite, false, 0.2, 0.2);\n        this.cameras.main.fadeIn(100, 0, 0, 0);\n        // make lizards\n        this.lizards = {};\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards['lizard' + i] = new lizard_1.default(e.x, e.y, this, i);\n        }\n        // make spiders\n        this.spiders = {};\n        var spiderCounter = 0;\n        data.spider.forEach(function (e) {\n            _this.spiders['spider' + spiderCounter] = new spider_1.default(e.x, e.y, _this, spiderCounter, false);\n            spiderCounter += 1;\n        });\n        data.spiderArmored.forEach(function (e) {\n            _this.spiders['spider' + spiderCounter] = new spider_1.default(e.x, e.y, _this, spiderCounter, true);\n            spiderCounter += 1;\n        });\n        this.blocks = {};\n        // make steels\n        data.steel.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new steel_1.default(e.x, e.y, _this, e.frame);\n            _this.blocks[e.x + ',' + e.y].sprite.setName('steeltemp');\n        });\n        // make dirts\n        data.dirt.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        //make bombs\n        this.bombs = {};\n        for (var i = 0; i < data.bomb.length; i++) {\n            var e = data.bomb[i];\n            this.bombs['bomb' + i] = new bomb_1.default(e.x, e.y, i, this);\n            this.blocks[e.x + ',' + e.y] = this.bombs['bomb' + i];\n        }\n        var crates = new Set();\n        var counter = 0;\n        this.crates = {};\n        data.crate.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame, false);\n            crates.add(_this.blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = _this.blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        data.lava.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame, true);\n            crates.add(_this.blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = _this.blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        data.exit.forEach(function (e) {\n            new exit_1.default(e.x, e.y, _this);\n        });\n        var crateAndLava = data.crate.concat(data.lava);\n        Helpers.compoundBlocks(this, crateAndLava);\n        var steel = data.steel;\n        Helpers.compoundBlocks(this, steel);\n        init_1.jointBlocks(this, this.blocks, data);\n        collision_controller_1.createCollisions(this);\n        init_1.connectorBlocks(this, this.blocks, data);\n        Helpers.initDynamicAndStaticQueues(this);\n        // Helpers.updateDynamic(this);\n        Helpers.updateStatic(this);\n        cursors = this.input.keyboard.createCursorKeys();\n        wasdr = this.input.keyboard.addKeys('W,S,A,D,R');\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    GameScene.prototype.update = function () {\n        var e_1, _a, e_2, _b;\n        var _this = this;\n        // add crates to tiles\n        // this.mover.setVelocityX(2);\n        // this.mover.setScale(2);\n        if (wasdr.R.isDown) {\n            this.scene.restart();\n        }\n        if (this.player.getY() > this.xTiles * this.TILE_SIZE) {\n            this.scene.restart();\n        }\n        Helpers.clearTiles(this);\n        Object.keys(this.crates).forEach(function (key) {\n            var curr = _this.crates[key];\n            if (curr.sprite.active) {\n                //TODO optimize later\n                var _a = __read(Helpers.getTile(curr.sprite.x, curr.sprite.y), 2), x = _a[0], y = _a[1];\n                //TODO CHECK IF IN BOUNDS OF WORLD\n                if (y > 0 && y < _this.xTiles) {\n                    _this.tiles[x][y].add(curr);\n                }\n                else {\n                    _this.destroyQueue.add(curr);\n                    _this.dynamicBlockQueue.delete(curr);\n                }\n            }\n        });\n        try {\n            for (var _c = __values(Object.entries(this.lizards)), _d = _c.next(); !_d.done; _d = _c.next()) {\n                var _e = __read(_d.value, 2), key = _e[0], lizard = _e[1];\n                lizard.update();\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n        try {\n            for (var _f = __values(Object.entries(this.spiders)), _g = _f.next(); !_g.done; _g = _f.next()) {\n                var _h = __read(_g.value, 2), key = _h[0], spider = _h[1];\n                spider.update();\n            }\n        }\n        catch (e_2_1) { e_2 = { error: e_2_1 }; }\n        finally {\n            try {\n                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);\n            }\n            finally { if (e_2) throw e_2.error; }\n        }\n        if (wasdr.A.isDown) {\n            this.player.moveLeft();\n        }\n        else if (wasdr.D.isDown) {\n            this.player.moveRight();\n        }\n        else {\n            this.player.turn();\n        }\n        if (wasdr.W.isDown && this.player.touchingGround) {\n            this.player.jump();\n        }\n        Helpers.updateDynamic(this);\n        Helpers.updateStatic(this);\n        // process crates to be burned and make above blocks dynamic when destroyed\n        this.burnQueue.forEach(function (owner) {\n            Helpers.igniteCompound(_this, owner);\n            _this.burnQueue.delete(owner);\n        });\n        this.destroyQueue.forEach(function (crate) {\n            var id = Helpers.blockId(crate);\n            if (_this.blocks[id] == crate) {\n                delete _this.blocks[id];\n            }\n            _this.destroyQueue.delete(crate);\n            _this.dynamicBlockQueue.delete(crate);\n            _this.staticBlockQueue.delete(crate);\n            crate.destroy(_this);\n        });\n        //shooting fire and setting the direction\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !this.fireActive &&\n            !this.fireCooldown) {\n            this.fireCooldown = true;\n            this.fire = this.matter.add.sprite(this.player.getX(), this.player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            var direction = 'right';\n            this.fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                this.fire.setRotation(Math.PI);\n                direction = 'left';\n            }\n            if (cursors.down.isDown) {\n                this.fire.setRotation(Math.PI / 2);\n                direction = 'none';\n            }\n            if (cursors.up.isDown) {\n                this.fire.setRotation((3 * Math.PI) / 2);\n                direction = 'none';\n            }\n            this.player.shoot(direction);\n            this.fire.anims.play('fireball', true);\n            this.fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            this.fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            this.fire.setVelocityY(yVel * yDir);\n            this.fireActive = true;\n            setTimeout(function () {\n                if (_this.fireActive) {\n                    _this.fireActive = false;\n                    _this.fire.destroy();\n                }\n                _this.fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(this.crates).forEach(function (key) {\n            var crate = _this.crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nvar level_select_scene_1 = __webpack_require__(/*! ./level-select-scene */ \"./src/scenes/level-select-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor, level_select_scene_1.LevelSelect];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar FileSaver = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\nvar levelSizeButton_1 = __webpack_require__(/*! ../helpers/levelSizeButton */ \"./src/helpers/levelSizeButton.ts\");\nvar cursors;\nvar controls;\nvar pointer;\nvar aGrid;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        _this.width = 24;\n        _this.height = 12;\n        return _this;\n    }\n    LevelEditor.prototype.create = function () {\n        var _this = this;\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var preset = localStorage.getItem('upload') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('leveleditorlevel');\n        preset = preset.width == null ? JSON.parse(preset) : preset;\n        this.width = preset.width;\n        this.height = preset.height;\n        var world_bound_width = this.width * 50;\n        var world_bound_height = this.height * 50;\n        var background = this.add.tileSprite(world_bound_width / 2, world_bound_height / 2, world_bound_width, world_bound_height, 'backgroundDirt');\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.3,\n            drag: 0.0005,\n            maxSpeed: 0.3,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: world_bound_width / 50,\n            rows: world_bound_height / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        // new LevelEditorButton(550, 20, 'Start Level', '#fff', 'start', this);\n        // new LevelEditorButton(700, 20, 'download', '#fff', 'download', this);\n        // new LevelEditorButton(550, 75, 'Clump', '#fff', 'clump', this);\n        var menuNames = [\n            'Start Level',\n            'Download',\n            'Upload',\n            'Clump',\n            'Connect',\n            'Exit',\n            'Bomb',\n            'Clear',\n            'Crate',\n            'Lava',\n            'Dirt',\n            'Steel',\n            'Lizard',\n            'Spider',\n            'Player',\n            'Armor Spider',\n        ];\n        var menuSelects = [\n            'start',\n            'download',\n            'upload',\n            'clump',\n            'connector',\n            'exit',\n            'bomb',\n            'clear',\n            'crate',\n            'lava',\n            'dirt',\n            'steel',\n            'lizard',\n            'spider',\n            'player',\n            'spiderArmored',\n        ];\n        var menuButtons = [];\n        for (var i = 0; i < menuNames.length; i++) {\n            if (i < 5) {\n                menuButtons.push(new levelEditorButton_1.default(700, 20 + i * 30, menuNames[i], '#fff', menuSelects[i], this));\n            }\n            else {\n                menuButtons.push(new levelEditorButton_1.default(700, 40 + i * 30, menuNames[i], '#fff', menuSelects[i], this));\n            }\n        }\n        menuButtons.push(new levelSizeButton_1.default(700, 40 + menuNames.length * 30, 'width', this));\n        menuButtons.push(new levelSizeButton_1.default(700, 40 + (menuNames.length + 1) * 30, 'height', this));\n        this.buttons = menuButtons;\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump' || game.selected == 'connector') {\n                draw = true;\n            }\n        });\n        // initalize graphics to draw highlighting rectangle and be drawn on top\n        this.graphics = this.add.graphics();\n        this.graphics.depth = 2;\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            var sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));\n            var sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));\n            var er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));\n            var ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));\n            if (game.selected == 'clump') {\n                aGrid.clumpBox(sr, sc, er, ec);\n            }\n            else if (game.selected == 'connector') {\n                aGrid.connect(sr, sc, er, ec, game);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && (game.selected == 'clump' || game.selected == 'connector')) {\n                // graphics.clear();\n                var graphics = game.graphics;\n                graphics.clear();\n                graphics.fillStyle(0x0000ff, 0.4);\n                graphics.lineStyle(2, 0x0000ff, 0.75);\n                graphics.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        aGrid.show();\n        // const preset = JSON.parse(JSON.stringify(localStorage.getItem('leveleditorlevel')));\n        aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);\n        preset.dirt.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'dirt', e.frame, _this);\n        });\n        preset.steel.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'steel', e.frame, _this);\n        });\n        preset.crate.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'crate', e.frame, _this);\n        });\n        preset.lava.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'lava', e.frame, _this);\n        });\n        preset.lizard.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'lizard', '0', _this);\n        });\n        preset.spider.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'spider', '0', _this);\n        });\n        preset.exit.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'exit', '0', _this);\n        });\n        preset.bomb.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'bomb', '0', _this);\n        });\n        preset.connector.forEach(function (e) {\n            var xp = parseInt(e.substring(0, e.indexOf(',')));\n            var yp = parseInt(e.substring(e.indexOf(',') + 1));\n            aGrid.connectors[e] = game.add.image(xp, yp, 'connector');\n            if (yp % 50 == 0) {\n                aGrid.connectors[e].angle = 90;\n            }\n        });\n        aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);\n        // aGrid.clumpBox(0, 0, aGrid.getRowOrCol(world_bound_width - 1), aGrid.getRowOrCol(world_bound_height - 1));\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    LevelEditor.prototype.generateJson = function (start, resize) {\n        var e_1, _a;\n        if (start === void 0) { start = true; }\n        if (resize === void 0) { resize = false; }\n        var json = {\n            width: this.width,\n            height: this.height + 1,\n            player: [],\n            lizard: [],\n            spider: [],\n            spiderArmored: [],\n            dirt: [],\n            lava: [],\n            crate: [],\n            steel: [],\n            exit: [],\n            bomb: [],\n            connector: [],\n        };\n        var grid = aGrid.grid;\n        for (var i = 0; i < grid.length; i++) {\n            for (var j = 0; j < grid[0].length; j++) {\n                if (grid[i][j]) {\n                    var obj = grid[i][j];\n                    if ((i < this.width && j < this.height) || obj.name == 'player') {\n                        // check min in case new world size cuts off player location\n                        json[obj.name].push({\n                            x: obj.x,\n                            y: obj.y,\n                            frame: obj.frame.name,\n                        });\n                    }\n                }\n            }\n        }\n        try {\n            for (var _b = __values(Object.entries(aGrid.connectors)), _c = _b.next(); !_c.done; _c = _b.next()) {\n                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];\n                json['connector'].push(key);\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n        var download = JSON.stringify(json);\n        // start level immediately instead of download\n        if (start) {\n            localStorage.setItem('leveleditorlevel', download);\n            localStorage.setItem('useleveleditor', 'true');\n            this.scene.start('Game');\n        }\n        else if (resize) {\n            localStorage.setItem('upload', 'true');\n            localStorage.setItem('leveleditorlevel', download);\n            this.scene.restart();\n        }\n        else {\n            // for downloads\n            var fileToSave = new Blob([JSON.stringify(json, null, 2)], {\n                type: 'application/json',\n            });\n            FileSaver(fileToSave, 'level.json');\n        }\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            if (this.selected == 'clump' || this.selected == 'connector') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ }),

/***/ "./src/scenes/level-select-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-select-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelSelect = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelSelect',\n};\n/**\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\n */\nvar LevelSelect = /** @class */ (function (_super) {\n    __extends(LevelSelect, _super);\n    function LevelSelect() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    LevelSelect.prototype.create = function () {\n        var _this = this;\n        this.add\n            .text(100, 50, 'Level Select', {\n            color: '#FFFFFF',\n        })\n            .setFontSize(24);\n        localStorage.setItem('useleveleditor', 'false');\n        var counter = 1;\n        for (var i = 0; i < 4; i++) {\n            var _loop_1 = function (j) {\n                var num = counter.toString();\n                new menu_button_1.MenuButton(this_1, 100 + j * 150, 100 + i * 100, counter.toString(), function () {\n                    localStorage.setItem('useleveleditor', 'false');\n                    localStorage.setItem('level', num);\n                    _this.scene.start('Game');\n                }, 20, 20);\n                counter++;\n            };\n            var this_1 = this;\n            for (var j = 0; j < 5; j++) {\n                _loop_1(j);\n            }\n        }\n    };\n    return LevelSelect;\n}(Phaser.Scene));\nexports.LevelSelect = LevelSelect;\n\n\n//# sourceURL=webpack:///./src/scenes/level-select-scene.ts?");

/***/ }),

/***/ "./src/scenes/main-menu-scene.ts":
/*!***************************************!*\
  !*** ./src/scenes/main-menu-scene.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.MainMenuScene = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'MainMenu',\n};\n/**\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\n */\nvar MainMenuScene = /** @class */ (function (_super) {\n    __extends(MainMenuScene, _super);\n    function MainMenuScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    MainMenuScene.prototype.preload = function () {\n        this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');\n        // this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    MainMenuScene.prototype.create = function () {\n        var _this = this;\n        var background = this.add.tileSprite(400, 300, 800, 600, 'backgroundDirt');\n        this.add\n            .text(100, 50, 'Pyrokid', {\n            color: '#FFFFFF',\n        })\n            .setFontSize(48);\n        localStorage.setItem('useleveleditor', 'false');\n        this.anims.create({\n            key: 'shootRight',\n            frames: this.anims.generateFrameNumbers('shoot', { start: 6, end: 9 }),\n            frameRate: 5,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'screenfireball',\n            frames: this.anims.generateFrameNumbers('screenfireball', { start: 3, end: 5 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        var kid = this.add.sprite(400, 250, 'shoot');\n        kid.scaleX = 3;\n        kid.scaleY = 3;\n        kid.anims.play('shootRight');\n        // for (let i = 0; i < 4; i++) {\n        //   for (let j = 0; j < 3; j++) {\n        //     const dirt = this.add.sprite(400 + i * 100, 370 + j * 100, 'dirt');\n        //     dirt.scaleX = 2;\n        //     dirt.scaleY = 2;\n        //   }\n        // }\n        var fireball = this.add.sprite(600, 250, 'screenfireball');\n        fireball.scaleX = 3;\n        fireball.scaleY = 3;\n        fireball.anims.play('screenfireball');\n        new menu_button_1.MenuButton(this, 100, 150, 'Level Select', function () {\n            localStorage.setItem('useleveleditor', 'false');\n            _this.scene.start('LevelSelect');\n        });\n        new menu_button_1.MenuButton(this, 100, 250, 'Level Editor', function () {\n            // localStorage.setItem('leveleditorlevel', JSON.stringify(this.cache.json.get('leveleditorlevel')));\n            localStorage.setItem('upload', 'false');\n            _this.scene.start('LevelEditor');\n        });\n        new menu_button_1.MenuButton(this, 100, 350, 'Help', function () { return console.log('help button clicked'); });\n    };\n    return MainMenuScene;\n}(Phaser.Scene));\nexports.MainMenuScene = MainMenuScene;\n\n\n//# sourceURL=webpack:///./src/scenes/main-menu-scene.ts?");

/***/ }),

/***/ "./src/ui/menu-button.ts":
/*!*******************************!*\
  !*** ./src/ui/menu-button.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.MenuButton = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar minimumWidth = 10;\nvar minimumHeight = 50;\nvar MenuButton = /** @class */ (function (_super) {\n    __extends(MenuButton, _super);\n    function MenuButton(scene, x, y, text, onClick, w, h, fontSize, haveTopPadding) {\n        if (fontSize === void 0) { fontSize = 18; }\n        if (haveTopPadding === void 0) { haveTopPadding = true; }\n        var _this = _super.call(this, scene, x, y) || this;\n        scene.add.existing(_this);\n        _this.setOrigin(0, 0);\n        var padding = haveTopPadding ? 10 : 0;\n        _this.label = scene.add\n            .text(x + 10, y + padding, text)\n            .setFontSize(fontSize)\n            .setAlign('center')\n            .setDepth(2);\n        _this.label.scrollFactorX = 0;\n        _this.label.scrollFactorY = 0;\n        _this.scrollFactorX = 0;\n        _this.scrollFactorY = 0;\n        _this.pressed = false;\n        var rectW = w ? w : _this.label.width;\n        var rectH = h ? h : _this.label.height;\n        var labelWidth = rectW + 2 * padding;\n        var labelHeight = rectH + 2 * padding;\n        _this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;\n        // this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;\n        if (w) {\n            _this.width = labelWidth;\n        }\n        else {\n            _this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;\n        }\n        if (h) {\n            _this.height = labelHeight;\n        }\n        else {\n            _this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;\n        }\n        _this.setInteractive({ useHandCursor: true })\n            .on('pointerover', _this.enterMenuButtonHoverState)\n            .on('pointerout', _this.enterMenuButtonRestState)\n            .on('pointerdown', _this.enterMenuButtonActiveState);\n        // .on('pointerup', this.enterMenuButtonHoverState);\n        if (onClick) {\n            _this.on('pointerup', onClick);\n        }\n        _this.enterMenuButtonRestState();\n        return _this;\n    }\n    MenuButton.prototype.enterMenuButtonHoverState = function () {\n        if (!this.pressed) {\n            this.label.setColor('#000000');\n            this.setFillStyle(0x888888);\n        }\n    };\n    MenuButton.prototype.enterMenuButtonRestState = function () {\n        if (!this.pressed) {\n            this.label.setColor('#FFFFFF');\n            this.setFillStyle(0x888888);\n        }\n    };\n    MenuButton.prototype.enterMenuButtonActiveState = function () {\n        this.pressed = true;\n        this.label.setColor('#BBBBBB');\n        this.setFillStyle(0x444444);\n    };\n    return MenuButton;\n}(Phaser.GameObjects.Rectangle));\nexports.MenuButton = MenuButton;\n\n\n//# sourceURL=webpack:///./src/ui/menu-button.ts?");

/***/ }),

/***/ 0:
/*!*********************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:8080 (webpack)/hot/dev-server.js ./src/main.ts ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /home/rose/dev/pyrokid/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 */\"./node_modules/webpack-dev-server/client/index.js?http://localhost:8080\");\n__webpack_require__(/*! /home/rose/dev/pyrokid/node_modules/webpack/hot/dev-server.js */\"./node_modules/webpack/hot/dev-server.js\");\nmodule.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_(webpack)-dev-server/client?");

/***/ })

/******/ });