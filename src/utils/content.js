import * as contentful from 'contentful';
import config from '../config/config';

export default class Content {
  constructor() {
    const { space, accessToken } = config;
    this.client = contentful.createClient( { space, accessToken } );
  }

  requestItems = (resolve, reject) => this.client.getEntries({
    'content_type': 'article',
    //'fields.industries[match]': 'продуктовый ритейл'
  }).then(resolve).catch(reject);

  requestItem = (resolve, reject, itemID) => this.client.getEntry(itemID).then(resolve).catch(reject);

  formatDate = date => (new Date(date)).toLocaleDateString('ru-RU', {hour:'2-digit', minute:'2-digit'});
}
