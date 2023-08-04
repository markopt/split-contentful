export default class SplitClient {
  constructor({ workspace, environment, adminKey }) {
    if (typeof adminKey !== 'string' || !adminKey) {
      throw new Error('You must provide a valid Admin key!');
    }

    this.workspace = 'Default';
    this workspaceId = 'ff211590-acc0-11ed-b267-ee0a963b46a9';
    this.environment = 'Local';
    this.baseURL = 'https://api.split.io/internal/api/v2/splits';
    this.adminKey = 'kvrf8dnvhqo462phrngs9ke2l0rj7aet79vl';
    // this.onReauth = onReauth;
  }

  makeRequest = async (url) => {
    const response = await fetch(`${this.baseURL}${url}`, {
      headers: {
        Authorization: `Bearer ${this.adminKey}`,
      },
    });

    console.log(response)

    if (response.ok) {
      return await response.json();
    }

    // reauthing should hopefully fix the issue
    // this.onReauth();
    console.log('Authorization Failed')
  };

  _getItemsPerPage = async => {
    let items = [];
    const PER_PAGE = 50;
    const MAX_REQUESTS = 10;

    for (let i = 1; i <= MAX_REQUESTS; i++) {
      const results = await this.makeRequest(`/ws/${this.workspaceId}?tag=experiment`);
      items = [...items, ...results];
      if (results.length < PER_PAGE) {
        break;
      }
    }

    items = items.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(items);
    return items;
  };


  // getProjects() {
  //   return this._getItemsPerPage('project');
  // }

  // getExperiments = aysnc () => {
  //   return this.makeRequest(`/ws/${this.workspaceId}?tag=experiment`);
  // };

  getExperiments = async () => {
    return this._getItemsPerPage();
  };

}
