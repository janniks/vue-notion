import Notion from 'vue-notion'

const NotionPlugin = (context, inject) => {
  const notion = Notion
  inject('notion', notion)
}

export default NotionPlugin