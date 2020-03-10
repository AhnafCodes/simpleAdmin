import { addExpandCollapseBehavior } from "./js-utils.js";
import Navigo from "/web_modules/navigo.js";

/*
Routing
 */

 const router = new Navigo();
 router.on({
    '/': function () {
      console.log('base');
    },
    'manage-user': function () {
       console.log('manage-user');
    },
    'content': function () {
      console.log('content');
    },
    '*': function () {
      console.log('*');
    }
  }).resolve();

addExpandCollapseBehavior(document.getElementById("main-menu-button"), {
  ".grid-container": ["collapsed"]
});

