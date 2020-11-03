import axios from 'axios';

export const abort = {
  created() {
    this.cancelToken = axios.CancelToken.source();
  },
  destroyed() {
    if (this.cancelToken && typeof this.cancelToken.cancel === 'function') this.cancelToken.cancel('REQUEST_CANCELED');
  },
  beforeRouteLeave(to, from, next) {
    if (this.cancelToken && typeof this.cancelToken.cancel === 'function') this.cancelToken.cancel('REQUEST_CANCELED');
    next();
  },
};

export const a = 1;
