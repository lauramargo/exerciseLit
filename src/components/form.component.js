import { html, LitElement, css } from "lit";
import '../ui/posts.ui';
export class MyForm extends LitElement {
    static get properties() {
      return {
        
        titleValue: { type: String },
        bodyValue: { type: String },
        
      };
    }
    constructor() {
      super();
      
      this.titleValue = '';
      this.bodyValue = '';
      
    }
    static get styles() {
      return css`
        :host {
          display: block;
          padding: 10px;
        }
        input, textarea {
          margin-bottom: 10px;
          display: block;
        }
        .formBox__text {
          width: 300px;
        }
.formBox__btn {
  padding: 5px 5px;
  color: white;
    min-width: 100px;
    background-color: var(--color-grey-dark-2);
    border: 1px solid var(--color-grey);
    border-radius: 1.5rem;
    cursor: pointer;
    font-size: var(--font-size-button);
    line-height: var(--line-height-button);
    box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
}
.btn:hover {
    background-color: var(--color-primary);
    color: var(--color-positive);
  }
  .disabled-btn {
    cursor: initial;
    background-color: var(--color-grey-light-2);
    color: var(--color-grey);
  }
  .disabled-btn:hover {
    background-color: var(--color-grey-light-2);
    color: var(--color-grey);
  }
      `;
    }
    render() {
      return html`
        <div class="formBox">
          <h2>Post Detail</h2>
          <label for="title-input">Title:</label>
          <input class="formBox__text" type="text" id="title-input" placeholder="Titulo" .value="${this.titleValue}" @input="${this._handleTitleInput}"/>
          <label for="body-input">Body:</label>
          <input class="formBox__text" id="body-input" placeholder="descripción" .value="${this.bodyValue}" @input="${this._handleBodyInput}"/>
          <button class="formBox__btn" id="crear-btn" @click=${this._onCreateClick}>Crear</button>
          <button class="formBox__btn" id="cancelar-btn" @click=${this._handleCancel}>Cancelar</button>
          <button class="formBox__btn" id="borrar-btn" @click=${this._handleDelete}>Delete</button>
          </div>
      `;
    }
    _handleTitleInput(event) {
      this.titleValue = event.target.value;
      
    }
    _handleBodyInput(event) {
      this.bodyValue = event.target.value;
      
    }
    _onCreateClick() {
      const newPost = {title: this.titleValue, body: this.bodyValue};
      this.dispatchEvent(new CustomEvent('post-change', { detail: newPost }));
      console.log(newPost);
      console.log(this.titleValue);
        
        // Restablecer los valores de los inputs después de que el post haya sido creado
        this.titleValue = '';
      this.bodyValue = '';
      
      
    }
    _handlePostCreated(event) {
      const post = event.detail;
      const postsUI = document.querySelector('posts-ui');
      postsUI.addPost(post);
    }
    _handleCancel() {
      
      this.titleValue = '';
      this.bodyValue = '';
    }
  }
  customElements.define('form-component', MyForm);