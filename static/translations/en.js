export default {
  'content': 'This is some {type} content',
  homeLinkText: 'HOME',
  modules: {
    authors: {
      moduleName: 'Authors',
      actions: {
        'list': 'List',
        'create': 'Create'
      }
    },
    books: {
      moduleName: 'Books',
      actions: {
        'list': 'List',
        'create': 'Create'
      }
    }
  },
  responseMessages: {
    errors: {
      server: 'Server error!',
      create: 'Add error!'
    },
    success: {
      create: 'Successfully added!',
      saved: 'Successfully saved!'
    }
  }
}
