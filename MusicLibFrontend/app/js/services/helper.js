//helperFunctions
musicLibraryApp.value('capitalizeFirstLetter', function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
});
musicLibraryApp.value('ngAttr',function(el,name, value) {
    var element = angular.element(el).get(0);

    return element.getAttribute(name) || element.getAttribute('data-' + name);
});
