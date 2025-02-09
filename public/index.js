(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const links = document.querySelector("#links");

    const loadFiles = async () => {
        const res = await fetch("/filelist");
        const data = await res.json();
        let template = `<a href="%LINK">%LINK</a><br>`;
        let html = ``;

        data.urlfiles.forEach(element => {
            html += template.replaceAll("%LINK", element);
        });

        links.innerHTML = html;

    }
  
    const handleSubmit = async (event) => {
      const formData = new FormData();
      formData.append("file", inputFile.files[0]);
      const fetchOptions = {
        method: 'post',
        body: formData
      };
      try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        link.setAttribute("href", data.url);
        link.innerText = data.url;
      } catch (e) {
        console.log(e);
      }
      await loadFiles();
    }

    await loadFiles();
  
    button.onclick = handleSubmit;
})();