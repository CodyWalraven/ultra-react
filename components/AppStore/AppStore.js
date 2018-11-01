export class AppStore {
  constructor(token) {
    this.token = token
  }

  get client_token() {
    if (this.token === undefined) {
      return undefined
    } else {
      return this.token
    }
  }

  set client_token(input) {
    this.token = input
  }

  //Asset ID getter and setter
  set main_entity_id(id) {
    this.assetID = id
  }
  get main_entity_id() {
    return this.assetID
  }
}
