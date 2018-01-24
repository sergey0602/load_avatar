'use strict';

class Request {
  constructor() {
    this.findElements();
    this.buttonHandler();
  }

  findElements() {
    this.input = document.querySelector('input');
    this.button = document.querySelector('button');
  }

  buttonHandler() {
    this.button.addEventListener('click', () => this.sendData());
  }

  sendData() {
    if (this.input.value) {
      const formData = new FormData(document.forms.file);
      formData.append("file", this.input.files[0]);
      fetch('http://localhost:6289/file', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.status !== 200) {
          console.log(`Oops, problem. Status Code: ${response.status}`);
          return;
        }
        return response.text();
      })
      .then(data => {
        this.input.value='';
        console.log(data);
      })
      .catch(error => console.log('error', error.message));
    }
  }
}

const request = new Request();
