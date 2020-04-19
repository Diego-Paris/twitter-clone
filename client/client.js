console.log("hello world!");

// reference to the form
const form = document.querySelector("form");

// reference to the loading gif
const loadingElement = document.querySelector('.loading');
// keeps it from displaying
loadingElement.style.display = 'none';


// adds an event listener to the form
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents the form attempting to upload data
    
    // FormData is built into the browser, it works by passing a reference to the form
    const formData = new FormData(form);
    
    // Since our <input> in html has the name 'name' that's how we access it
    const name = formData.get('name');

    // Since our <textarea> in html has the name 'content' that's how we access it
    const content = formData.get('content');

    const mew = {
        name,
        content
    }
    console.log(mew);
    form.style.display = 'none';
    loadingElement.style.display = '';
    
});
