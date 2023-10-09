# How to use

Open the file `./config/settings.json`

```
{
  "name": "dtmModule",
  "template": "./src/index.html",
  "endpoint": "remote.js",
  "devServerPort": 9091,
  "typesOutputDir": "public/types",
  "public": ["..","public"],
  "remotes": [],
  "exposes": {}
}
```

Change the devServerPort to a free port and the name of the module that will be registered in the registry. Then expose any new components you develop.
For example add key-values to the `expose` object. The key will be used by external services to access the implementation in the value.

```
    "./pages/Page1": "./src/components/pages/Page1.tsx",
    "./pages/Page2": "./src/components/pages/Page2.tsx"
```

In variable `remotes` you can list the projects you want to use in this module by its registry id, e.g. `dtmServices`, `dtmUX`. These modules must be registered in the platform registry.

To start developing just type:

```
  yarn
  yarn start:dev
```

Remote microfrontend types will be synchronized and immediately available for developers. Remote types will become available from the folder `types/{module}`.

In your local tests, you need to generate the proper registry. Namely, you must add more entries to `modules` and generate new root objects like `dtmModule` with the IDs of new modules. If on the same server, ports must not collide.
