import { App } from "vue";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";

import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import Image from "primevue/Image";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";
import Textarea from "primevue/textarea";
import Column from "primevue/column";
import DataTable from "primevue/datatable";

const register = (app: App<Element>): void => {
  app.use(PrimeVue, { ripple: true });
  app.directive("styleclass", StyleClass);
  app.directive("badge", BadgeDirective);
  app.component("Accordion", Accordion);
  app.component("AccordionTab", AccordionTab);
  app.component("Badge", Badge);
  app.component("Button", Button);
  app.component("Card", Card);
  app.component("Calendar", Calendar);
  app.component("Dialog", Dialog);
  app.component("Image", Image);
  app.component("InputSwitch", InputSwitch);
  app.component("InputText", InputText);
  app.component("Toolbar", Toolbar);
  app.component("Textarea", Textarea);
  app.component("Column", Column);
  app.component("DataTable", DataTable);
};

export default {
  register,
};
