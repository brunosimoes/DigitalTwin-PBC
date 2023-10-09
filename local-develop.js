const fs = require("fs");

/**
 * Updates the registry file with the new dev server port.
 *
 * @param {string} name - The name of the current application.
 * @param {Object} registry - The registry object.
 * @param {number} port - The new dev server port.
 */
function updateRegistry(name, registry, port) {
  const proxyPath = registry[name].proxyPath;

  if (proxyPath !== "/") {
    registry[name].remote = registry[name].remote.replace(proxyPath, ":" + port);
    registry[name].url = registry[name].url.replace(proxyPath, ":" + port);
  }
  registry[name].remote = registry[name].remote.replace("localhost/", "localhost:" + port + "/");
  registry[name].url = registry[name].url.replace("localhost/", "localhost:" + port + "/");

  // Write the updated registry object to the registry file.
  const updatedRegistry = JSON.stringify(registry, null, 2);
  fs.writeFile("src/constants/registry.json", updatedRegistry, "utf8", (err) => {
    if (err) {
      console.error("Error writing to registry.json:", err);
    } else {
      console.log("Successfully updated registry.json!");
    }
  });
}

// Get the settings and registry objects.
const settings = require("./config/settings.json");
const registry = require("./src/constants/registry.json");

// Get the name and dev server port from the settings and registry objects.
const name = settings.name;
const port = registry[name].devServerPort;

// Update the registry file with the new dev server port.
updateRegistry(name, registry, port);
