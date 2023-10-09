// Generates an HTML file to serve webpack bundles
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Allows sharing of code between multiple webpack builds
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Allows the use of remote types in a project
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;

// Bundles files into a tarball
const TarWebpackPlugin = require('tar-webpack-plugin').default;

// Copies individual files or entire directories to the build directory
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Allows to compute paths
const path = require('path');

// Application settings
const app = require('./config/settings.json');

// Registry settings for remote types
const registry = require(path.resolve(__dirname, "src", "constants", "registry.json"));

// Use typescript alias for webpack
const tsconfig = require("./tsconfig.json");

// Set up remotes and aliases
const remotes = {};
app.remotes.forEach(name => {
  if (registry[name] === undefined) console.error("Microfrontend " + name + " is missing");
  else remotes[name] = name + '@' + registry[name].remote;
});

// Webpack aliases for file paths
const alias = {};
const paths = tsconfig.compilerOptions.paths;
Object.keys(paths).forEach(key => {
  const id = key.replace("/*", "");
  const val = paths[key][0].replace("/*", "").replace("./", "");
  if (id.length > 0)
    alias[id] = path.resolve(__dirname, val); // Resolve file paths for each alias
});

// Configure webpack plugins
let plugins = [];

// Copy public files to build directory
if (app.public && app.public.length > 0) {
  plugins = [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, ...app.public) }]
    })
  ]
}

// Configure module federation plugin
const deps = require("./package.json").dependencies;
plugins = [
  ...plugins,
  new ModuleFederationPlugin({
    name: app.name, // Name of the current application
    filename: app.endpoint, // Name of the generated manifest file
    exposes: app.exposes, // Exposed modules
    remotes: remotes, // Remote modules
    shared: {
      ...deps, // Shared dependencies
      react: {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps.react // Required version of react
      },
      "react-dom": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["react-dom"] // Required version of react-dom
      },
      "react-dom": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["react-dom"] // Required version of react-dom
      },
      "@mui/icons-material": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["@mui/icons-material"] // Required version of react-dom
      },
      "@mui/material": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["@mui/material"] // Required version of react-dom
      },
      "@emotion/react": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["@emotion/react"] // Required version of react-dom
      },
      "@emotion/styled": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["@emotion/styled"] // Required version of react-dom
      },
      "@iconify/react": {
        singleton: true, // Only one instance of the module is allowed
        requiredVersion: deps["@iconify/react"] // Required version of react-dom
      }
    }
  }),

  // Configure webpack remote types plugin for each remote
  ...app.remotes.map(name => {
    let url = registry[name].url;
    if (registry[name].enableProxy && process.env.HOSTNAME !== undefined) {
      url = registry[name].url.replace(/localhost/g, process.env.HOSTNAME);
    }
    if(!url.endsWith("/")) url += "/";

    return new WebpackRemoteTypesPlugin({
      remotes: { [name]: name + '@' + url },
      outputDir: 'types', // Output directory for the remote type
      remoteFileName: name + '-dts.tgz' // Name of the generated remote type file
    })
  }),

  // Configure module to export types
  new TarWebpackPlugin({
    action: 'c',
    gzip: true,
    C: app.typesOutputDir,
    file: "public/" + app.name + '-dts.tgz',
    fileList: ['.']
  }),

  // Setup webpage
  new HtmlWebPackPlugin({
    template: app.template
  })
];

module.exports = {
  ...app,
  alias,
  plugins,
  publicPath: registry[app.name].url + "/"
}