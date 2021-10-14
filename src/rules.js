export const Rules = {
    
    //Requerido
    required:[
        v => !!v || 'Requerido'
    ],
   
    //Numero Entero
    integer: [
        v => !!v || 'Requerido',
        v => !!(isNaN(v) ? false : (parseFloat(v) | 0 === parseFloat(v) )) || 'Debe ingresar un numero entero'
    ],

    //Numero Entero
    decimal: [
        v => !!v || 'Requerido',
        v => /^(\d+(?:[\.]\d{2})?)$/.test(v) || 'Debe ingresar un numero con dos decimales'
    ],

    //Solo Letras y espacio
    alpha: [
        v => !!v || 'Requerido',
        v => /^[a-zA-Z\s]*$/.test(v) || 'Solo puede ingresar letras'
    ],

    //email
    email: [
        v => !!v || 'Requerido',
        v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(v) || 'Email inválido',
        v => (v || '').indexOf(' ') < 0 || 'No puede haber espacios',
    ],

    //contraseña - tamaño
    password: [
        v => !!v || 'Requerido',
        v => (v || '').length >= 8 || 'La contraseña debe tener minimo 8 caracteres',
    ],
    
    //numero de telefono - tamaño 1234-5678 size -> 9
    phonesize: [
        v => !!v || 'Requerido',
        v => (v || '').length >= 9 || 'Numero de telefono incompleto',
    ],
   


   
    
    
};