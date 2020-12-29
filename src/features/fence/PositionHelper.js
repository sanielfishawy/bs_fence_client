import 'convert-units'
import 'pluralize'

class PositionHelper{

    static unit_display = {
        long: {
            in: "inch",
            cm: "centimeter",
        },
        short: {
            in: "in",
            cm: "cm",
        }
    }


    static display_position_centimeters(position){
        return ( position * 2.54 ).toFixed()
    }

    static position_for_slider(position){
        return position * 100
    }

    static position_from_slider(position){
        return position / 100.0
    }

    static display_unit_with_unit(unit){

    }
}

export default PositionHelper
