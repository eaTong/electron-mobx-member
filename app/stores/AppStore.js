/**
 * Created by eatong on 17-4-9.
 */
import {observable, action, computed, toJS, autorun} from 'mobx';
import {remote} from 'electron';
const {db} = remote.require('./app/services');

export default class AppStore {
  @observable checkingDB = true;
  @observable dbConnected = false;

  @action
  checkConnection = () => {
    db.checkConnection(result => {
      this.dbConnected = result.success;
      this.checkingDB = false;
    })
  }
}
