class Loader{
    name;

    constructor(){
        this.name = "Loader";
    }

    loadHeader(){
        $(document).ready(function(e) {
            $('#cabecera').load('/templates/header.html',function(){console.log('header loaded')});
        });
    }
    loadFooter(){
        $(document).ready(function(e) {
            $('#footer').load('/templates/footer.html',function(){console.log('footer loaded')});
        });
    }

}