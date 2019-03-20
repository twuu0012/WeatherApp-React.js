import React from 'react';

const Button = () => {

    // When click 'Celsius' or 'Fahrenheit', the relevant result will be displayed.

    const onClickCel = (event) =>{

        document.getElementsByClassName('cel-temp')[0].style.display = 'block';
        document.getElementsByClassName('fah-temp')[0].style.display = 'none';

        const elements = document.getElementsByClassName('item-content');
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].getElementsByClassName('max-cel')[0].style.display = 'block';
            elements[i].getElementsByClassName('min-cel')[0].style.display = 'block';
            elements[i].getElementsByClassName('max-fah')[0].style.display = 'none';
            elements[i].getElementsByClassName('min-fah')[0].style.display = 'none';
        }
    };

    const onClickFah = (event) =>{
        document.getElementsByClassName('cel-temp')[0].style.display = 'none';
        document.getElementsByClassName('fah-temp')[0].style.display = 'block';

        const elements = document.getElementsByClassName('item-content');
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].getElementsByClassName('max-cel')[0].style.display = 'none';
            elements[i].getElementsByClassName('min-cel')[0].style.display = 'none';
            elements[i].getElementsByClassName('min-fah')[0].style.display = 'block';
            elements[i].getElementsByClassName('max-fah')[0].style.display = 'block';
        }
    };

    return (

        <div className='mode_button ui buttons'>
            <button className='cel ui button' onClick={onClickCel}>Celsius</button>
            <button className='fah ui button' onClick={onClickFah}>Fahrenheit</button>
        </div>
    );
};

export default Button;