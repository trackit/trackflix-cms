/// <reference path="../../custom.d.ts" />
import os from 'os';
import moment from 'moment';


const sendToOpensearch = (data) => {
  if (data && data.setting && data.setting.saveToElastic === false) return;

  const index =
    (data.setting && data.setting.index) || 'strapi_opensearch_log';

  data.metaData = {
    pid: process.pid,
    free_mem: os.freemem(),
    total_mem: os.totalmem(),
    hostname: os.hostname(),
    loadavg: os.loadavg(),
    time: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  };

  delete data.setting;

  return strapi.opensearch.index({
    index,
    body: data,
  });
};

const displayLog = (data) => {
  // deprecated property
  let show = data && data.setting && data.setting.show;
  show = typeof show === 'boolean' ? show : true;

  let display = data && data.setting && data.setting.display;
  show = typeof display === 'boolean' ? display : true;

  return show && display;
};

const log = ({ level, msg, data }) => {
  if (displayLog(data)) {
    strapi.log[level](msg);
  }
};

export default {
  custom: (msg, data) => {
    log({ msg, data, level: false });
    sendToOpensearch({ msg, ...data, level: 'custom' });
  },
  warn: (msg, data) => {
    log({ msg, level: 'warn', data });
    sendToOpensearch({ msg, ...data, level: 'warn' });
  },
  fatal: (msg, data) => {
    log({ msg, level: 'fatal', data });
    sendToOpensearch({ msg, ...data, level: 'fatal' });
  },
  info: (msg, data) => {
    log({ msg, level: 'info', data });
    sendToOpensearch({ msg, ...data, level: 'info' });
  },
  debug: (msg, data) => {
    log({ msg, level: 'debug', data });
    sendToOpensearch({ msg, ...data, level: 'debug' });
  },
  error: (msg, data) => {
    log({ msg, level: 'error', data });
    sendToOpensearch({ msg, ...data, level: 'error' });
  },

};
