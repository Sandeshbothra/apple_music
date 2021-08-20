import {Fragment} from 'react';
const DisplayTypeButton = (props) => {
    return(
        <Fragment>
            { props.type === 'grid' &&
                <svg width="30" height="30">
                    <rect x="0" y="0" width="8" height="6"/>
                    <rect x="10" y="0" width="8" height="6"/>
                    <rect x="20" y="0" width="8" height="6"/>
                    <rect x="0" y="7" width="8" height="6"/>
                    <rect x="10" y="7" width="8" height="6"/>
                    <rect x="20" y="7" width="8" height="6"/>
                    <rect x="0" y="14" width="8" height="6"/>
                    <rect x="10" y="14" width="8" height="6"/>
                    <rect x="20" y="14" width="8" height="6"/>
                    <rect x="0" y="21" width="8" height="6"/>
                    <rect x="10" y="21" width="8" height="6"/>
                    <rect x="20" y="21" width="8" height="6"/>
                </svg>
            }
            { props.type === 'list' &&
                <svg width="30" height="30">
                    <rect x="0" y="0" width="28" height="6"/>
                    <rect x="0" y="7" width="28" height="6"/>
                    <rect x="0" y="14" width="28" height="6"/>
                    <rect x="0" y="21" width="28" height="6"/>
                </svg>
            }
        </Fragment>
    )
}

export default DisplayTypeButton;