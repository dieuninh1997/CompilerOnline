function changeLanguage(){
    console.log('here')
    var language = document.getElementById('languageOption selector').value;
    var langCode;
    switch(language){
        case "1":
            langCode="c_cpp";
            break;
        case "2":
            langCode="c_cpp";
            break;
        case "9":
            langCode="csharp";
            break;
        case "3":
            langCode="java";
            break;
        case "20":
            langCode="javascript";
            break;
        case "5":
            langCode="python";
            break;
    }
    var lang = {langCode: langCode};
    window.location.href = '/changelang/'+langCode+'/'+language;
}

$(document).ready(function(){
    $('.compilerButton').on('click',function(){
        alert("Cannot compile empty source");
        var editor = ace.edit("editor");
        if($('.languageOption select').val()==""){
            alert("Please select a language");
        }else if(editor.getValue()==""){
            alert("Cannot compile empty source");
        }
    });
});