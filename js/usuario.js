export class Usuario{
    nombre = "";
    apellidos = "";
    nickname="";
    correo="";
    contrasena="";

    constructor(){}

    setNobre(nombre){
        this.nombre = nombre;
    }
    setApellidos(apellidos){
        this.apelldios = apellidos;
    }
    setNickname(nickname){
        this.nickname = nickname;
    }
    setCorreo(correo){
        this.correo = correo;
    }
    setContrasena(contrasena){
        this.contrasena = contrasena;
    }
    toString(){
        let usuario = "nombre: "+this.nombre+" apellidos: "+this.apellidos+" nickname: "+this.nickname+
            " correo: "+this.correo;
        return usuario;
    }

}