export const Rules = {

    //Requerido
    required: [
        v => !!v || 'Requerido'
    ],

    //Numero Entero
    integer: [
        v => !!v || 'Requerido',
        v => !!(isNaN(v) ? false : (parseFloat(v) | 0 === parseFloat(v))) || 'Debe ingresar un numero entero'
    ],

    //Numero decimal con dos decimales
    decimal: [
        v => !!v || 'Requerido',
        v => /^(\d+(?:[\.]\d{0,2})?)$/.test(v) || 'Debe ingresar un numero con dos decimales'
    ],

    test: (value = false) => {
        console.log(value);
        return [

            v => !!v || 'Requerido',
            v => /^(\d+(?:[\.]\d{2})?)$/.test(v) || 'Debe ingresar un numero con dos decimales',
            v => parseFloat(v) >= parseFloat(value) || 'Monto insuficiente, debe ser mayor a $' + value,

        ]

    },

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
    //verificar contraseña
    verificarpass: (value = false) => {
        console.log(value);
        return [
        v => !!v || 'Requerido',
       // v => (v || '').length >= 8 || 'La contraseña debe tener minimo 8 caracteres',
        v => v === value || 'Las contaseñas no coinciden',
        ]

    },

    //numero de telefono - tamaño 1234-5678 size -> 9
    phonesize: [
        v => !!v || 'Requerido',
        v => (v || '').length >= 9 || 'Numero de telefono incompleto',
    ],

    //numero de tarjeta - tamaño 1234 5678 1234 5678 tamaño con espacios -> 19
    cardsize: [
        v => !!v || 'Requerido',
        v => (v || '').length >= 19 || 'Numero de tarjeta incompleto',
    ],

    //numero de cvv de tarjeta, tres digitos
    cvvsize: [
        v => !!v || 'Requerido',
        v => (v || '').length >= 3 || 'CVV incompleto',
    ],

};

export const rulesText = () => {
    const rules = [];

    const minLenght = 3;

    if (minLenght) {
        const rule = (v) =>
            (v || "").length >= minLenght ||
            `Se necesitan al menos ${minLenght} caracteres`;

        rules.push(rule);
    }

    return rules;
};

export const rulesCantidad = () => {
    const rules = [];

    const minNum = 1;

    if (minNum) {
        const rule = (v) => {
            if (!isNaN(parseFloat(v)) && v >= minNum) return true;

            return "La cantidad debe ser mayor a cero";
        };

        rules.push(rule);
    }

    return rules;
};