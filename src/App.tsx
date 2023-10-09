import * as ReactDOMClient from "react-dom/client";
import ApplicationToggle, { Application } from "@pages/ApplicationToggle";
import LoadingSpinner from "@spinners/LoadingSpinner";
import { ServiceDummyA } from "@pages/ServiceDummyA";
import { ServiceDummyB } from "@pages/ServiceDummyB";

import React from "react";
import "./index.scss";

const components: Application[] = [
  { name: "Dummy Service A", comp: ServiceDummyA },
  { name: "Dummy Service B", comp: ServiceDummyB },
];

const App = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <ApplicationToggle components={components} />
  </React.Suspense>
);

const root = ReactDOMClient.createRoot(
  document.getElementById("app") as HTMLElement
);

root.render(<App />);
