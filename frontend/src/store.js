import {observable, action, makeObservable, makeAutoObservable} from 'mobx';
class DocumentStore {
  constructor() {
    this.documents = [];
    makeAutoObservable(this, {
      documents: observable,
      setDocuments: action,
    });
  }

  setDocuments(documents) {
    this.documents = documents;
  }
}

// DocumentStore = makeAutoObservable(DocumentStore, {
//   // documents: observable,
//   // setDocuments: action,
// });
export {DocumentStore};
