import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

fetch('/layout.json')
  .then(res => res.json())
  .then((layout) => {
    // console.log(layout);
    const routes = constructRoutes(layout);
    const applications = constructApplications({
      routes,
      loadApp({ name }) {
        return System.import(name);
      },
    });
    const layoutEngine = constructLayoutEngine({ routes, applications });

    applications.forEach(registerApplication);
    layoutEngine.activate();
    start();
  });

export * from './mount-points';