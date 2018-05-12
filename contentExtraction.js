(function() {
    const existingRequirerScriptContainer = document.querySelector('#requirerScriptContainer');
    if (existingRequirerScriptContainer) {
        document.body.removeChild(existingRequirerScriptContainer);
    }
    const requirerScriptContainer = document.createElement('div');
    const script = document.createElement('script');
    requirerScriptContainer.setAttribute('id', 'requirerScriptContainer');
    script.type = 'text/javascript';
    script.innerHTML = 'console.table(dependencyTree);document.body.dataset.dependencyTree = JSON.stringify(window.dependencyTree);';
    requirerScriptContainer.appendChild(script);
    document.body.appendChild(requirerScriptContainer);
    return JSON.parse(document.body.dataset.dependencyTree);
})();
