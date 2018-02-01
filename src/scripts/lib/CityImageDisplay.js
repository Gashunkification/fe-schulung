export default class CityImageDisplay {
    constructor(jsonData) {
        this.jsonData = JSON.parse(jsonData);
    }

    __clearNode(node) {
        const oldPicture = document.getElementById('citylogo');
        const oldLink = document.getElementById('sourcelink');
        oldPicture.parentNode.removeChild(oldPicture);
        oldLink.parentNode.removeChild(oldLink);
    }

    __getPictureElement() {
        const picture = document.createElement('picture');
        const sourceMobile = document.createElement('source');
        const sourceDesktop = document.createElement('source');
        const img = document.createElement('img');

        sourceDesktop.setAttribute('media', '(min-width: 768px )');
        sourceDesktop.setAttribute('srcset', this.jsonData.photos[0].image.web);

        sourceMobile.setAttribute('media', '(max-width: 768px )');
        sourceMobile.setAttribute('srcset', this.jsonData.photos[0].image.mobile);
        
        img.classList.add('img-responsive');
        img.classList.add('img-full-width');

        picture.setAttribute('id', 'citylogo');

        picture.appendChild(sourceDesktop);
        picture.appendChild(sourceMobile);
        picture.appendChild(img);

        return picture;
    }

    __getSourceLink() {
        const anchor = document.createElement('a');
        const sourceData = this.jsonData.photos[0].attribution;

        anchor.classList.add('source-link');
        anchor.setAttribute('id', 'sourcelink');
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('href', sourceData.source);
        anchor.innerHTML = sourceData.photographer;

        return anchor;
    }

    display(rootElement) {
        try {
            if (!rootElement) {
                throw Error('No element found to render to. Please check!');
            }
        } catch (error) {
            console.error(error);
        }

        const picture = this.__getPictureElement();
        const sourceLink = this.__getSourceLink();

        this.__clearNode(rootElement);
        rootElement.appendChild(picture);
        rootElement.appendChild(sourceLink);
    }
}