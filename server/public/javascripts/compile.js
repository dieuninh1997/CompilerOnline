function changeLanguage() {
    
    var language=document.getElementById('languageSelector').value;
    var langCode;
    switch(language){
        case "1":
            langCode="C";
            break;
        case "2":
            langCode="CPP";
            break;
        case "3":
            langCode="CSHARP";
            break;
        case "4":
            langCode="JAVA";
            break;
        case "5":
            langCode="JAVASCRIPT";
            break;
        case "6":
            langCode="PYTHON";
            break;
    } 
    var lang = {
        langCode: langCode
    }
    console.log(langCode);
    console.log(language);
    window.location.href='/changelang/'+langCode+"/"+language;
}