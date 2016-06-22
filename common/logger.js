'use strict';

/**
 * 日志记录器
 */

const log4js = require('log4js');
const config = require('../config');

log4js.configure({appenders: config.get('log.appenders')});

const logger = log4js.getLogger('cheese');
logger.setLevel(config.get('log.level'));

module.exports = logger;
