export default {
  content: 'This is some {type} content',
  homeLinkText: 'Домой',
  modules: {
    authors: {
      moduleName: 'Авторы',
      actions: {
        'list': 'Список',
        'create': 'Добавить'
      }
    },
    books: {
      moduleName: 'Книги',
      actions: {
        'list': 'Список',
        'create': 'Добавить'
      }
    }
  },
  responseMessages: {
    errors: {
      server: 'Ошибка сервера',
      create: 'Ошибка добавления'
    },
    success: {
      create: 'Успешно добавлено'
    }
  }
}
