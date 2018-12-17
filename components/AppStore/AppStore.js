/* eslint-disable no-console */
export class AppStore {
  constructor(token) {
    this.token = token
    //this.assetData = "undefined"
  }

  set asset_data(input2) {
    this.assetData = input2
  }

  get asset_data() {
    return this.assetData
  }

  set asset_id(input) {
    this.assetId = input
  }
  get asset_id() {
    return this.assetId
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
