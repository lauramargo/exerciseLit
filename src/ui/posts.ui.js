import { html, LitElement } from "lit";

export class PostsUI extends LitElement {

    static get properties() {
        return {
          posts: { type: Array },
          selectedPostId: { type: Number },
          editing: { type: Boolean },
        };
      }
      constructor() {
        super();
        this.posts = [
          { id: 1, title: 'Post 1', body: 'Body of post 1' },
          { id: 2, title: 'Post 2', body: 'Body of post 2' },
          { id: 3, title: 'Post 3', body: 'Body of post 3' },
        ];
        this.selectedPostId = null;
        this.editing = false;
      }
      render() {
        return html`
          <ul>
            ${this.posts.map(post => html`
              <li @click="${() => this.selectPost(post.id)}">${post.title}</li>
            `)}
          </ul>
          <button @click="${() => this.dispatchEvent(new CustomEvent('add-post'))}">Add</button>
          ${this.editing ? html`
            <form-component
              .post="${this.getSelectedPost()}"
              .editing="${this.editing}"
              @save="${(e) => this.savePost(e.detail)}"
              @cancel="${() => this.cancelEdit()}">
            </form-component>
          ` : ''}
        `;
      }
      selectPost(postId) {
        this.selectedPostId = postId;
        this.editing = true;
        this.requestUpdate();
      }
      getSelectedPost() {
        return this.posts.find(post => post.id === this.selectedPostId);
      }
      savePost(postData) {
        if (this.editing) {
          const index = this.posts.findIndex(post => post.id === this.selectedPostId);
          this.posts[index] = { ...this.getSelectedPost(), ...postData };
        } else {
          const newPostId = Math.max(...this.posts.map(post => post.id)) + 1;
          this.posts.push({ id: newPostId, ...postData });
        }
        this.editing = false;
        this.selectedPostId = null;
        this.requestUpdate();
      }
      cancelEdit() {
        this.editing = false;
        this.selectedPostId = null;
        this.requestUpdate();
      }
    }



customElements.define('posts-ui', PostsUI);