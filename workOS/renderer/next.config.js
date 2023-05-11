const path = require("path");

/**
 * @type {import('next-react-svg').NextReactSvgConfig}
 */
const nextReactSvgConfig = {
  include: path.resolve(__dirname, "src/assets/svg"),
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

const withReactSvg = require("next-react-svg")(nextReactSvgConfig);

module.exports = withReactSvg(nextConfig);
