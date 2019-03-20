import React from 'react';
import ItemsCarousel from 'react-items-carousel';

 class Carousel extends React.Component {

     state = {children: [], activeItemIndex: 0};

     componentWillReceiveProps(nextProps, nextContext) {
         this.setState({
             children: nextProps.datalist,
             activeItemIndex: nextProps.datalist.length,
         });
     }


    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    render() {
        const {
            activeItemIndex,
            children,
        } = this.state;

        return (
            <ItemsCarousel
                // Carousel configurations
                numberOfCards={3}
                gutter={10}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={true}

                // Active item configurations
                requestToChangeActive={this.changeActiveItem}
                activeItemIndex={activeItemIndex}
                activePosition={'right'}

                chevronWidth={32}
                rightChevron={'>'}
                leftChevron={'<'}
                outsideChevron={true}
            >
                {children}
            </ItemsCarousel>
        );
    }
}
export default Carousel;