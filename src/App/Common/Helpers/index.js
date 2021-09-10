// Install all components

import {MainLayout } from "./Layout";
import {
  CenterLoader,
  Card,
  Datatable,
  BaseInput,
  Multiselect,
  AjaxPagination,
  Modal
} from "@/App/Common/Helpers/Components";

export default {
  install: function(app) {
    //layout
    app.component("main-layout", MainLayout);

    // components
    app.component("center-loader", CenterLoader);
    app.component("card", Card);
    app.component("datatable", Datatable);
    app.component("BaseInput", BaseInput);
    app.component("SelectInput", Multiselect);
    app.component("AjaxPagination", AjaxPagination);
    app.component("Modal", Modal);

  }
};
