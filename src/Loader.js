import React from 'react'

const Loader = () => {
    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', marginLeft: '-16px', marginTop: '-16px'}}>
            <div style={{ zIndex: '2001', border: 'medium none', margin: '0px', padding: '0px', width: '100%', height: '100%', top: '0px', left: '0px', backgroundColor: 'rgb(255, 255, 255)', opacity: '0.5', cursor: 'default', position: 'fixed', display: 'block'}} />
            <img src={require('./icons/loader.gif')} alt='Aguarde' style={{ position: 'fixed', left: '50%', top: '50%' }} />
        </div>
    )
}

export default Loader