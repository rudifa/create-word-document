import {makeAutoObservable} from 'mobx';
class DocumentStore {
  constructor() {
    this.documents = [];
    makeAutoObservable(this);
  }

  setDocuments = (documents) => {
    this.documents = documents;
  }
}

// DocumentStore = makeAutoObservable(DocumentStore, {
//   // documents: observable,
//   // setDocuments: action,
// });
export {DocumentStore};
