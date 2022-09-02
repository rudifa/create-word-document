import { observable, action, decorate } from "mobx";
class DocumentStore {
  documents = [];
setDoc
uments(documents) {
    this.documents = documents;
  }
}
DocumentStore = decorate(DocumentStore, {
  documents: observable,
  setDocuments: action
});
export { DocumentStore };