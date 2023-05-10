module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config;
  },
};
