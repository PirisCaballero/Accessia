class Loader{
    name;

    constructor(){
        this.name = "Loader";
    }

    loadHeader(){
        $(document).ready(function(e) {
            $('#cabecera').load('/templates/header.html',function(){});
        });
    }
    loadFooter(){
        $(document).ready(function(e) {
            $('#footer').load('/templates/footer.html',function(){});
        });
    }

}