import Main from '@/components/actions/Main'

export default [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/authors/:action/:page',
    component: resolve => require(['@/components/controllers/AuthorsController'], resolve)
  },
  {
    path: '/authors/:action',
    component: resolve => require(['@/components/controllers/AuthorsController'], resolve)
  },
  {
    path: '/books/:action/:page',
    component: resolve => require(['@/components/controllers/BooksController'], resolve)
  },
  {
    path: '/books/:action',
    component: resolve => require(['@/components/controllers/BooksController'], resolve)
  },
  {
    path: '/edit/:items/:id',
    component: resolve => require(['@/components/prototype/ActionUpdate'], resolve)
  }
]
