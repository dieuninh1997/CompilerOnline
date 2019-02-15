$(document).ready(function(){
    $('.compileButton').on('click', function() {
        var editor = ace.edit("editor");
        if ($('.languageSelector').val() == "") {
            alert("Please select a language");
        } else if (editor.getValue() == "") {
            alert("Cannot compile empty source");
        } else {
            $('#runRespone').html("");
            $('#runRespone').html("Compiling... Please wait");
            var testCase=[];
            testCase[0]=$('.customInput').val();
            if (testCase.length == -1) {
                testCase.push(" ");
            }

            var config = {
                source: editor.getValue(),
                input: JSON.stringify(testCase),
                language: $('.languageSelector').val()
            };

            $.ajax({
                type: 'POST',
                url: '/compile',
                data: config,
                dataType: 'json'
            }).done(function(data){
                data = JSON.parse(data);
                var str = (data.result.compilemessage).toString();
                str=decodeURIComponent(escape(str));

                $('#runRespone').html("");
                if(str==""){
                    $('#runRespone').html("Compile Message: Compilation Successful <br><br>");
                    $('#runRespone').append("Output <br>");
                    (data.result.stdout).forEach(function(item, index){
                        $('#runRespone').append(data.result.stdout[index]+"<br>");
                    });
                }else{
                    $('#runRespone').html("Compile Message: "+str+"<br><br>");
                }
            });
        }
    });
});


// function changeLanguage() {
    
//     var language=document.getElementById('languageSelector').value;
//     var langCode;
//     switch(language){
//         case "1":
//             langCode="C";
//             break;
//         case "2":
//             langCode="CPP";
//             break;
//         case "3":
//             langCode="CSHARP";
//             break;
//         case "4":
//             langCode="JAVA";
//             break;
//         case "5":
//             langCode="JAVASCRIPT";
//             break;
//         case "6":
//             langCode="PYTHON";
//             break;
//     } 
//     var lang = {
//         langCode: langCode
//     }
//     console.log(langCode);
//     console.log(language);
//     window.location.href='/changelang/'+langCode+"/"+language;
// }