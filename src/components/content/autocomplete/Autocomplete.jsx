import React, {useEffect} from 'react';
import usePlacesAutocomplete, {getGeocode,getLatLng} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import s from './autocomplete.module.css'

const Autocomplete = ({isLoaded, setCoords, setPlace}) => {

    const {
        ready,
        value,
        suggestions: { status, data },
        init,
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
            initOnMount: true,
            debounce: 300,
    })

    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect =
        ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();
                setPlace(description)
                console.log(description)
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    setCoords({ lat, lng })
                })
            }

    useEffect(()=>{
        if(isLoaded) {
            init()
        }
    }, [isLoaded, init])

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)} className={s.line}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });


    return (
        <div ref={ref} className={s.container}>
            <div className={s.main}>
                <label>Location</label>
                <input type={'text'}
                       value={value}
                       onChange={handleInput}
                       disabled={!ready}
                       placeholder="Location"
                       className={s.autocomplete}
                />
            </div>
            {status === "OK" && <ul className={s.list}>{renderSuggestions()}</ul>}
        </div>
    );
};

export default Autocomplete;