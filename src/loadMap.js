class LoadMap {
  constructor(version, url) {
    this.version = version;
    this.url = url;
    this.query = {};
    this.randomNum = this.__getRandomNum();
    this.callbackKey = 'loadMapCb' + this.randomNum;
    this.scriptId = 'loadMap' + this.randomNum;
    this.__getType();
    this.__getWinKey();
  }
  __init({
    version,
    mapKey,
    url,
    query,
  }) {
    if (!mapKey) {
      throw new Error('必须配置mapKey');
    }
    this.mapKey = mapKey;
    if (version) {
      this.version = version;
    }
    if (url) {
      this.url = url;
    }
    if (query && Object.keys(query).length) {
      this.query = query;
    }
    this.__getType();
    this.__getWinKey();
  }
  __getRandomNum() {
    return Math.ceil(Math.random() * 10000000000).toString().substr(0, 6);
  }
  __getType() {
    const url = this.url;
    if (/qq/.test(url)) {
      this.type = 'qq';
    } else if (/baidu/.test(url)) {
      this.type = 'baidu';
    } else {
      throw new Error('不支持此类型地图');
    }
  }
  // 获取绑定到window对象的key,需要先执行__getType
  __getWinKey() {
    const { type, url, query } = this;
    if (!type) return;
    let winKey;
    switch (type) {
      case 'qq':
        if (/\/gljs/.test(url)) {
          winKey = 'TMap';
        } else {
          winKey = 'qq';
        }
        break;
      case 'baidu':
        if (query && query.type === 'webgl') {
          winKey = 'BMapGL';
        } else {
          winKey = 'BMap';
        }
        break;
      default:
        winKey = 'qq';
    }
    this.winKey = winKey;
  }
  __createScriptElement() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = this.scriptId
    script.src = this.__generateURL();
    const head = document.getElementsByTagName('head')[0] || document.body;
    head.appendChild(script);
  }
  __generateURL() {
    const query = this.query;
    let queryStr = '';
    if (query && Object.keys(query).length) {
      Object.keys(query).map(key => {
        queryStr += '&' + key + '=' + encodeURIComponent(query[key]);
      })
    }
    if (this.type === 'qq') {
      return this.url + '?v=' + this.version + '&key=' + this.mapKey + queryStr + '&callback=' + this.callbackKey;
    }
    return this.url + '?v=' + this.version + '&ak=' + this.mapKey + queryStr + '&callback=' + this.callbackKey;
  }
  __isLoaded() {
    const map = window[this.winKey];
    if (map && map.__loadMap__) {
      return map;
    }
    return false;
  }
  load(config = {}) {
    this.__init(config);
    const isLoaded = this.__isLoaded();
    if (isLoaded) {
      return new Promise((resolve) => {
        resolve(isLoaded);
      })
    }
    this.__createScriptElement();
    return new Promise((resolve) => {
      window[this.callbackKey] = () => {
        window[this.winKey].__loadMap__ = true;
        resolve(window[this.winKey]);
      }
    })
  }
}
export default new LoadMap('2.exp', 'https://map.qq.com/api/js');
