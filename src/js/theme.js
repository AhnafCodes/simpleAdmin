import { addExpandCollapseBehavior } from "./js-utils.js";
import UniversalRouter from '/web_modules/universal-router.js'

addExpandCollapseBehavior(document.getElementById("main-menu-button"),  {
    ".grid-container": ["collapsed-sidenav"]
});


const routes = [
  {
    path: '/manage-user',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '', // optional, matches both "/posts" and "/posts/"
        action: () => `<h1>test</h1>`
      },
      {
        path: '/:id',
        action: (context) => `<h1>Post #${context.params.id}</h1>`
      }
    ]
  }
];
const routePaths = routes.map(route => route.path)
const router = new UniversalRouter(routes); 

document.getElementById("main-menu").addEventListener("click", (e) => {
    if(!e.target.href) {
      return;
    }
    const path = (new URL(e.target.href)).pathname
    if(routePaths.indexOf((new URL(e.target.href)).pathname != -1)){
       e.preventDefault();
       const state = { 'page_id': 1, 'user_id': 5 }
       const title = ''
       history.pushState(state, title, path)
    }
});


// router.resolve('/manage-user').then(html => {
//   document.getElementsByTagName('main')[0].html = html // renders: <h1>Posts</h1>
// })