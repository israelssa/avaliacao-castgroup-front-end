import swal from 'sweetalert2'

declare var $: any;

export class HelperAvaliacao{

    static notification(titulo, msg, type) {
        swal.fire(titulo, msg, type)
    }

    static showNotification(msg, type){
        swal.fire(msg, '', type)
    }

    static isNull(valueOne, valueTwo){
        if( valueOne )
            return valueOne;
        return valueTwo;
    }
}

  