import { addExpandCollapseBehavior } from "./js-utils.js";


addExpandCollapseBehavior(document.getElementById("main-menu-button"),  {
    ".grid-container": ["collapsed"]
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

document.getElementById("main-menu").addEventListener("click", (e) => {
    if(!e.target.href) {
      return;
    }
    const path = (new URL(e.target.href)).pathname
    if(routePaths.indexOf((new URL(e.target.href)).pathname != -1)){
       e.preventDefault();
       const { title=''  } = e.target;
       const state = { 'page_id': 1, 'user_id': 5 };
       history.pushState(state, title, path)
    }
});

