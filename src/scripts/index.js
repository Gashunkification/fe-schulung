/* Import von Autocomplete aus node_modules */
import Autocomplete from 'teleport-autocomplete';

document.addEventListener("DOMContentLoaded", (event) => {
    const myAutocomplete = new Autocomplete({ el: '#teleport-input', maxItems: 5 });
});
