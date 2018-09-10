import * as contentful from 'contentful';
import config from '../config/config';

export default class Content {
  constructor() {
    const { space, accessToken } = config;
    this.client = contentful.createClient( { space, accessToken } );
  }

  requestItems = (resolve, reject) => this.client.getEntries().then(resolve).catch(reject);
}
