
import { html, LitElement, css } from "lit";

export class MyForm extends LitElement {
    
static get properties() {
  return {
    post: { type: Object },
    editing: { type: Boolean },
    title: { type: String },
    body: { type: String },
  };
}
constructor() {
  super();
  this.post = null;
  this.editing = false;
  this.title = '';
  this.body = '';
}
render() {
  return html`
    <h2>${this.editing ? 'Edit post' : 'New post'}</h2>
    <form>
      <label>
        Title:
        <input type="text" name="title" .value="${this.title}" @input="${(e) => this.title = e.target.value}">
      </label>
      <label>
        Body:
        <input type="text" name="body" .value="${this.body}" @input="${(e) => this.body = e.target.value}">
      </label>
      <button type="button" @click="${() => this.save()}">${this.editing ? 'Save' : 'Create'}</button>
      ${this.editing ? html`
        <button type="button" @click="${() => this.dispatchEvent(new CustomEvent('cancel'))}">Cancel</button>
        <button type="button" @click="${() => this.delete()}">Delete</button>
      ` : ''}
    </form>
  `;
}
updated(changedProperties) {
  if (changedProperties.has('post')) {
    this.title = this.post?.title || '';
    this.body = this.post?.body || '';
  }
}
save() {
  if (!this.title || !this.body) {
    alert('Please enter a title and a body for the post');
    return;
  }
  this.dispatchEvent(new CustomEvent('save', { detail: { title: this.title, body: this.body } }));
  this.clearForm();
}
clearForm() {
  this.title = '';
  this.body = '';
}
delete() {
  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }
  this.dispatchEvent(new CustomEvent('delete', { detail: this.post.id }));
  this.clearForm();
}
}
  
  customElements.define('form-ui', MyForm);