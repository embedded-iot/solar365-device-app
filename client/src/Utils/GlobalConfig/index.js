class GlobalConfig {
  constructor() {
    this.globalConfig = {};
  }

  getConfigBackend = () => this.globalConfig

  setConfigBackend = (options = {}) => {
    this.globalConfig = {
      ...this.globalConfig,
      ...options
    };
  }
}

const globalConfig = new GlobalConfig();
export default globalConfig;
