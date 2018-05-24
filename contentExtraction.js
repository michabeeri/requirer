(function() {
    const existingRequirerScriptContainer = document.querySelector('#requirerScriptContainer');
    if (existingRequirerScriptContainer) {
        document.body.removeChild(existingRequirerScriptContainer);
    }
    const requirerScriptContainer = document.createElement('div');
    const script = document.createElement('script');
    requirerScriptContainer.setAttribute('id', 'requirerScriptContainer');
    script.type = 'text/javascript';
    script.innerHTML = `
        var keys = Object.keys(dependencyTree);
        console.table(keys.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())).map(name => {
            const early = dependencyTree[name][0].indexOf('main-r') !== -1;
            const firstUser = early ? dependencyTree[name][1] : dependencyTree[name][0];
            return {name, early: early ? '\u2705' : '', firstUser};
        }));
        document.body.dataset.dependencyTree = JSON.stringify(window.dependencyTree);`;
    
    requirerScriptContainer.appendChild(script);
    document.body.appendChild(requirerScriptContainer);
    return JSON.parse(document.body.dataset.dependencyTree);
})();
