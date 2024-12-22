"use strict";
const api_server = require("./server.js");
const getRecommendRank = (data) => api_server.server("/rank/recommend");
const getFinishedRank = (data) => api_server.server("/rank/finished");
const getGuessYouLike = (data) => api_server.server("/guessyoulike");
const calculateCoverMainColor = (url) => api_server.server(`/covermaincolor?url=${url}`);
const getNovelChapters = (novel_id) => api_server.server(`/novel/chapters?novel_id=${novel_id}`);
const getChapterContent = (novel_id, chapter_n) => api_server.server(
  `/novel/chapter/content?novel_id=${novel_id}&content_id=${chapter_n}`
);
exports.calculateCoverMainColor = calculateCoverMainColor;
exports.getChapterContent = getChapterContent;
exports.getFinishedRank = getFinishedRank;
exports.getGuessYouLike = getGuessYouLike;
exports.getNovelChapters = getNovelChapters;
exports.getRecommendRank = getRecommendRank;
